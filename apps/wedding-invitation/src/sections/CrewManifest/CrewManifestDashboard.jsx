import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSession, signIn, signUp, signOut } from '../../services/authClient';
import { useAdminRsvps, useAdminStats, useDeleteRsvp } from '../../hooks/useAdmin';
import { useToast } from '../../components/ui/Toast';
import './CrewManifestDashboard.css';

export default function CrewManifestDashboard() {
  const { data: session, isPending: sessionLoading } = useSession();
  const { data: rsvps = [], isLoading: rsvpsLoading } = useAdminRsvps();
  const { data: stats, isLoading: statsLoading } = useAdminStats();
  const { mutateAsync: deleteRsvp } = useDeleteRsvp();
  const addToast = useToast();

  // State for login/register form
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [authPending, setAuthPending] = useState(false);

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // all, hadir, tidak_hadir, ragu
  const [sortField, setSortField] = useState('createdAt'); // name, pax, createdAt
  const [sortDirection, setSortDirection] = useState('desc'); // asc, desc

  // Delete modal state
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const handleAuth = async (e) => {
    e.preventDefault();
    if (!email || !password || (isRegister && !name)) {
      addToast('Please fill in all required fields.', 'error');
      return;
    }

    setAuthPending(true);
    try {
      if (isRegister) {
        await signUp.email({
          email,
          password,
          name,
        }, {
          onSuccess: () => {
            addToast('Registration successful! Welcome aboard, Admiral!', 'success');
            setAuthPending(false);
          },
          onError: (ctx) => {
            addToast(ctx.error.message || 'Failed to register account.', 'error');
            setAuthPending(false);
          }
        });
      } else {
        await signIn.email({
          email,
          password,
        }, {
          onSuccess: () => {
            addToast('Access granted. Welcome back, Admiral!', 'success');
            setAuthPending(false);
          },
          onError: (ctx) => {
            addToast(ctx.error.message || 'Invalid email or password.', 'error');
            setAuthPending(false);
          }
        });
      }
    } catch (err) {
      addToast(err.message || 'Authentication error.', 'error');
      setAuthPending(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      addToast('Logged out successfully.', 'info');
    } catch (err) {
      addToast('Error signing out.', 'error');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteRsvp(id);
      addToast('Sailor removed from manifest.', 'success');
      setDeleteConfirmId(null);
    } catch (err) {
      addToast(err.message || 'Failed to delete entry.', 'error');
    }
  };

  // Filter and Sort RSVPs
  const filteredRsvps = useMemo(() => {
    let result = [...rsvps];

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(r => r.name.toLowerCase().includes(q) || (r.message && r.message.toLowerCase().includes(q)));
    }

    // Status Filter
    if (statusFilter !== 'all') {
      result = result.filter(r => r.attendance === statusFilter);
    }

    // Sort
    result.sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];

      if (sortField === 'createdAt') {
        aVal = new Date(aVal).getTime();
        bVal = new Date(bVal).getTime();
      }

      if (typeof aVal === 'string') {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
      }

      if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  }, [rsvps, searchQuery, statusFilter, sortField, sortDirection]);

  // Export to CSV Function
  const handleExportCSV = () => {
    if (rsvps.length === 0) {
      addToast('Manifest is empty. Nothing to export!', 'error');
      return;
    }

    const headers = ['Guest Name', 'Crew Size (Pax)', 'Status', 'Wishes / Log Entry', 'Signed Date'];
    const csvRows = [headers.join(',')];

    rsvps.forEach(r => {
      const statusLabel = r.attendance === 'hadir' ? 'Attending' : r.attendance === 'tidak_hadir' ? 'Absent' : 'Maybe';
      const cleanMessage = r.message ? r.message.replace(/"/g, '""').replace(/\n/g, ' ') : '';
      const formattedDate = new Date(r.createdAt).toLocaleString();
      
      const row = [
        `"${r.name.replace(/"/g, '""')}"`,
        r.pax,
        `"${statusLabel}"`,
        `"${cleanMessage}"`,
        `"${formattedDate}"`
      ];
      csvRows.push(row.join(','));
    });

    const csvContent = "data:text/csv;charset=utf-8," + csvRows.join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `wedding_crew_manifest_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    addToast('Crew Manifest exported to CSV successfully!', 'success');
  };

  const statusBadges = {
    hadir: { label: '⚓ Attending', class: 'badge-attending' },
    tidak_hadir: { label: '🌊 Absent', class: 'badge-absent' },
    ragu: { label: '🧭 Maybe', class: 'badge-maybe' }
  };

  if (sessionLoading) {
    return (
      <div className="admin-loading-screen flex flex-col items-center justify-center min-h-screen bg-[#060e1a] text-white">
        <div className="animate-spin text-6xl mb-4 text-gold-primary">⚓</div>
        <p className="font-pirate text-2xl gold-text tracking-widest">Scanning Logbooks...</p>
      </div>
    );
  }

  // Not Logged In screen
  if (!session) {
    return (
      <div className="admin-auth-container min-h-screen w-full flex items-center justify-center relative p-6 bg-[#060e1a] overflow-hidden">
        {/* Background vignette & stardust */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80 pointer-events-none" />
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />

        <motion.div 
          className="admin-auth-card w-full max-w-md relative z-10 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Top Seal Accent */}
          <div className="auth-wax-seal mb-4">⚓</div>
          
          <h2 className="font-pirate text-3xl md:text-4xl gold-text mb-2 tracking-wide">Captain's Cabin</h2>
          <p className="font-serif-readable italic text-readable text-sm mb-6 opacity-70">Admiral credentials required to view manifest.</p>

          <form onSubmit={handleAuth} className="flex flex-col gap-5 text-left">
            {isRegister && (
              <div className="flex flex-col gap-2">
                <label className="font-pirate text-sm text-gold-primary uppercase tracking-wider" htmlFor="admin-name">Admiral Name</label>
                <input
                  id="admin-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name..."
                  className="w-full bg-black/40 border border-gold-primary/20 text-ivory px-4 py-3 focus:border-gold-primary transition-colors outline-none font-serif-readable rounded"
                  required
                />
              </div>
            )}

            <div className="flex flex-col gap-2">
              <label className="font-pirate text-sm text-gold-primary uppercase tracking-wider" htmlFor="admin-email">Logbook Email</label>
              <input
                id="admin-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admiral@grandline.com"
                className="w-full bg-black/40 border border-gold-primary/20 text-ivory px-4 py-3 focus:border-gold-primary transition-colors outline-none font-serif-readable rounded"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-pirate text-sm text-gold-primary uppercase tracking-wider" htmlFor="admin-password">Secure Secret Code</label>
              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-black/40 border border-gold-primary/20 text-ivory px-4 py-3 focus:border-gold-primary transition-colors outline-none font-serif-readable rounded"
                required
              />
            </div>

            <button
              type="submit"
              disabled={authPending}
              className={`w-full py-4 bg-gold-primary text-bg-deep-sea font-pirate text-xl tracking-wider uppercase transition-all shadow-xl hover:bg-gold-light hover:scale-105 active:scale-95 mt-4 rounded ${authPending ? 'opacity-50 cursor-wait' : ''}`}
            >
              {authPending ? 'Consulting Compass...' : (isRegister ? '⚓ Register Admiral' : '🔑 Enter Cabin')}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gold-primary/10">
            <button 
              className="text-gold-primary hover:text-gold-light transition-colors text-sm font-bold uppercase tracking-wider font-pirate"
              onClick={() => {
                setIsRegister(!isRegister);
                setError('');
              }}
            >
              {isRegister ? 'Already Registered? Sign In' : 'Need Admiral Access? Register'}
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="dashboard-container min-h-screen w-full p-4 md:p-8 bg-[#060e1a] text-white relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 pointer-events-none" />
      
      {/* Header Panel */}
      <header className="dashboard-header flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-gold-primary/20 relative z-10">
        <div>
          <h1 className="font-pirate text-4xl md:text-5xl gold-text tracking-wide mb-1">Crew Manifest</h1>
          <p className="font-serif-readable italic text-readable opacity-70">Welcome back, Admiral {session.user.name || 'Captain'}! Charting the course to the Grand Line.</p>
        </div>
        <button
          onClick={handleLogout}
          className="self-start md:self-auto px-6 py-3 border border-red-500/30 text-red-400 font-pirate text-lg tracking-wider rounded uppercase hover:bg-red-500/10 transition-all active:scale-95"
        >
          ⚓ Abandon Ship
        </button>
      </header>

      {/* Stats Board */}
      <section className="stats-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mt-8 relative z-10">
        {statsLoading ? (
          <div className="col-span-full py-4 text-center text-gold-primary font-pirate text-xl">Loading stats...</div>
        ) : (
          <>
            <div className="stat-card">
              <span className="stat-title">Total Logs</span>
              <span className="stat-value">{stats?.totalSubmissions || 0}</span>
              <span className="stat-desc">RSVP Submissions</span>
            </div>
            <div className="stat-card card-attending">
              <span className="stat-title text-gold-primary">Total Crew</span>
              <span className="stat-value gold-text">{stats?.totalAttendingPax || 0}</span>
              <span className="stat-desc">Attending Nakama</span>
            </div>
            <div className="stat-card">
              <span className="stat-title">Attending RSVP</span>
              <span className="stat-value text-emerald-400">{stats?.attendingCount || 0}</span>
              <span className="stat-desc">Response: Hadir</span>
            </div>
            <div className="stat-card">
              <span className="stat-title">Absent RSVP</span>
              <span className="stat-value text-rose-400">{stats?.absentCount || 0}</span>
              <span className="stat-desc">Response: Absent</span>
            </div>
            <div className="stat-card">
              <span className="stat-title">Undecided</span>
              <span className="stat-value text-amber-400">{stats?.maybeCount || 0}</span>
              <span className="stat-desc">Response: Maybe</span>
            </div>
          </>
        )}
      </section>

      {/* Control Panel (Search, Filter, Export) */}
      <section className="control-bar flex flex-col lg:flex-row lg:items-center justify-between gap-6 mt-8 p-6 bg-black/40 border border-gold-primary/10 rounded relative z-10">
        {/* Search */}
        <div className="flex-1 min-w-[280px]">
          <input
            type="text"
            placeholder="Search Nakama by name or wishes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#0d1c2e] border border-gold-primary/20 text-ivory px-4 py-3 focus:border-gold-primary outline-none transition-colors rounded font-serif-readable"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-pirate text-sm text-gold-primary uppercase tracking-wider">Status:</span>
          {['all', 'hadir', 'tidak_hadir', 'ragu'].map(status => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-2 text-sm font-bold uppercase tracking-wider rounded transition-all font-pirate border
                ${statusFilter === status 
                  ? 'bg-gold-primary text-bg-deep-sea border-gold-primary' 
                  : 'bg-black/20 border-gold-primary/20 text-readable hover:border-gold-primary/50'}`}
            >
              {status === 'all' ? 'All Logs' : status === 'hadir' ? 'Attending' : status === 'tidak_hadir' ? 'Absent' : 'Maybe'}
            </button>
          ))}
        </div>

        {/* Export Button */}
        <button
          onClick={handleExportCSV}
          className="px-6 py-3 bg-gradient-to-r from-gold-deep to-gold-primary text-bg-deep-sea font-pirate text-md tracking-widest rounded shadow-xl hover:scale-105 transition-transform uppercase self-start lg:self-auto"
        >
          📜 Export Manifest
        </button>
      </section>

      {/* Main Table Scroll */}
      <section className="manifest-section mt-8 relative z-10">
        {rsvpsLoading ? (
          <div className="text-container py-16 flex flex-col items-center justify-center">
            <div className="animate-spin text-5xl mb-4 text-gold-primary">⚓</div>
            <p className="font-pirate text-xl gold-text tracking-widest">Consulting Logbooks...</p>
          </div>
        ) : filteredRsvps.length === 0 ? (
          <div className="text-container py-16 text-center italic text-readable">
            No sailors found on this horizon. Try altering search query or filters! 🏴‍☠️
          </div>
        ) : (
          <div className="parchment-scroll-container">
            <div className="parchment-scroll p-6 md:p-8">
              {/* Header */}
              <div className="flex justify-between items-center pb-4 mb-6 border-b-2 border-bronze/40">
                <h2 className="font-script text-3xl text-bg-deep-sea">Official Ship Log</h2>
                <span className="font-pirate text-sm text-bronze uppercase tracking-widest">{filteredRsvps.length} Nakama Logged</span>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="manifest-table w-full">
                  <thead>
                    <tr>
                      <th onClick={() => { setSortField('name'); setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc'); }}>
                        Nakama Name {sortField === 'name' && (sortDirection === 'asc' ? '▲' : '▼')}
                      </th>
                      <th onClick={() => { setSortField('pax'); setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc'); }}>
                        Crew Size {sortField === 'pax' && (sortDirection === 'asc' ? '▲' : '▼')}
                      </th>
                      <th>Status</th>
                      <th className="w-1/3">Wishes & Log Entry</th>
                      <th onClick={() => { setSortField('createdAt'); setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc'); }}>
                        Signed At {sortField === 'createdAt' && (sortDirection === 'asc' ? '▲' : '▼')}
                      </th>
                      <th className="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRsvps.map((rsvp) => (
                      <tr key={rsvp.id}>
                        <td className="font-bold" data-label="Nakama Name">{rsvp.name}</td>
                        <td data-label="Crew Size">
                          <span className="pax-indicator">{rsvp.pax} Person{rsvp.pax > 1 ? 's' : ''}</span>
                        </td>
                        <td data-label="Status">
                          <span className={`status-badge ${statusBadges[rsvp.attendance]?.class}`}>
                            {statusBadges[rsvp.attendance]?.label || rsvp.attendance}
                          </span>
                        </td>
                        <td className="italic font-serif-readable text-sm leading-relaxed" data-label="Wishes">
                          {rsvp.message ? `"${rsvp.message}"` : <span className="opacity-40">No message left</span>}
                        </td>
                        <td className="text-xs font-mono opacity-85" data-label="Signed At">
                          {new Date(rsvp.createdAt).toLocaleString()}
                        </td>
                        <td className="text-center">
                          {deleteConfirmId === rsvp.id ? (
                            <div className="flex items-center justify-center gap-2">
                              <button
                                onClick={() => handleDelete(rsvp.id)}
                                className="px-3 py-1 bg-red-600 text-white rounded text-xs uppercase font-pirate"
                              >
                                Confirm
                              </button>
                              <button
                                onClick={() => setDeleteConfirmId(null)}
                                className="px-3 py-1 bg-gray-500 text-white rounded text-xs uppercase font-pirate"
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setDeleteConfirmId(rsvp.id)}
                              className="text-red-700 hover:text-red-950 font-bold transition-colors text-lg"
                              title="Walk the plank"
                            >
                              ☠️
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
