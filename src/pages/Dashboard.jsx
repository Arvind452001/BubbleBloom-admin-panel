import React, { useEffect, useRef, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { getDashboardStats } from '../api/dashboard';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
);

// Sample data (same as before)
const sampleDashboardData = {
  status: 1,
  message: 'Dashboard statistics fetched successfully',
  data: {
    overview: {
      total_parents: 8,
      total_children: 6,
      total_script_logs: 6,
      total_activities: 48,
      total_faqs: 35,
      total_stages: 0,
      total_notifications: 4,
      total_contact_messages: 2,
    },
    users: {
      total: 8,
      active: 8,
      verified: 8,
      new_this_month: 8,
      onboarding_completion_rate: 0.0,
      verification_rate: 100.0,
      registration_trend: [
        { month: 'November 2025', count: 0 },
        { month: 'December 2025', count: 0 },
        { month: 'January 2026', count: 0 },
        { month: 'January 2026', count: 0 },
        { month: 'March 2026', count: 0 },
        { month: 'April 2026', count: 8 },
      ],
    },
    children: {
      total: 6,
      new_this_month: 6,
      average_per_parent: 0.75,
      by_gender: [
        { gender: 'Female', count: 1 },
        { gender: 'Male', count: 3 },
        { gender: 'male', count: 2 },
      ],
      by_communication_level: [
        { level: 'Non', count: 1 },
        { level: 'Normal', count: 1 },
        { level: 'Test ', count: 1 },
        { level: 'V', count: 1 },
        { level: 'toys', count: 2 },
      ],
    },
    script_logs: {
      total: 6,
      new_this_month: 6,
      active_users: 4,
      average_per_parent: 1.5,
      average_ai_confidence: 0,
      top_behaviors: [
        { behavior_type: 'Scripted language with emotional communication', count: 5 },
        { behavior_type: 'Scripted language with functional request', count: 1 },
      ],
      monthly_trend: [
        { month: 'November 2025', count: 0 },
        { month: 'December 2025', count: 0 },
        { month: 'January 2026', count: 0 },
        { month: 'January 2026', count: 0 },
        { month: 'March 2026', count: 0 },
        { month: 'April 2026', count: 6 },
      ],
    },
    activities: {
      total: 48,
      active: 48,
      system: 1,
      custom: 47,
      total_scripts: 544,
      by_category: [
        { category: 'daily_activities', count: 9 },
        { category: 'movement_play', count: 8 },
        { category: 'open_ended_play', count: 8 },
        { category: 'pretend_play', count: 23 },
      ],
    },
    stage_hub: { total: 0, active: 0 },
    notifications: {
      total: 4,
      unread: 4,
      new_this_month: 4,
      by_type: [
        { type: 'alert', count: 2 },
        { type: 'general', count: 2 },
      ],
    },
    contact_messages: { total: 2, new_this_month: 2 },
    engagement: {
      onboarding_completion_rate: 0.0,
      verification_rate: 100.0,
      avg_children_per_parent: 0.75,
      avg_scripts_per_parent: 1.5,
      script_usage_percentage: 50.0,
    },
    recent_activity_7_days: {
      new_users: 2,
      new_children: 1,
      new_scripts: 2,
      new_messages: 1,
    },
    top_users: [
      { parent_id: 5, full_name: 'Govind Singh', email: 'gs@yopmail.com', script_count: 3 },
      { parent_id: 2, full_name: 'Josh', email: 'happy@gmail.com', script_count: 1 },
      { parent_id: 3, full_name: 'Kapil', email: 'kapi@gmail.com', script_count: 1 },
      { parent_id: 9, full_name: 'Testing Account', email: 'testingacc@gmail.com', script_count: 1 },
    ],
  },
};

const aggregateMonthlyData = (trend) => {
  const aggregated = {};
  trend.forEach((item) => {
    aggregated[item.month] = (aggregated[item.month] || 0) + item.count;
  });
  return {
    labels: Object.keys(aggregated),
    counts: Object.values(aggregated),
  };
};

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDashboardStats();
        console.log("Fetched dashboard data:", data);
        setDashboardData(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading || !dashboardData) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  const {
    overview,
    users,
    children,
    script_logs,
    activities,
    notifications,
    contact_messages,
    engagement,
    recent_activity_7_days,
    top_users,
  } = dashboardData;

  const scriptTrend = aggregateMonthlyData(script_logs.monthly_trend);
  const userTrend = aggregateMonthlyData(users.registration_trend);

  // Gender aggregation
  const genderMap = new Map();
  children.by_gender.forEach((g) => {
    const key = g.gender.toLowerCase();
    genderMap.set(key, (genderMap.get(key) || 0) + g.count);
  });
  const genderChartData = {
    labels: Array.from(genderMap.keys()).map((k) => k.charAt(0).toUpperCase() + k.slice(1)),
    datasets: [{ data: Array.from(genderMap.values()), backgroundColor: ['#FF6B6B', '#4ECDC4', '#FFE66D'], borderWidth: 0 }],
  };

  const communicationChartData = {
    labels: children.by_communication_level.map((c) => c.level),
    datasets: [{ label: 'Children', data: children.by_communication_level.map((c) => c.count), backgroundColor: '#FF9F4A', borderRadius: 8 }],
  };

  const activitiesChartData = {
    labels: activities.by_category.map((c) => c.category.replace('_', ' ')),
    datasets: [{ label: 'Activities', data: activities.by_category.map((c) => c.count), backgroundColor: '#6C63FF', borderRadius: 8 }],
  };

  const behaviorChartData = {
    labels: script_logs.top_behaviors.map((b) => b.behavior_type),
    datasets: [{ label: 'Occurrences', data: script_logs.top_behaviors.map((b) => b.count), backgroundColor: '#FF6584', borderRadius: 8 }],
  };

  const notificationsChartData = {
    labels: notifications.by_type.map((n) => n.type),
    datasets: [{ data: notifications.by_type.map((n) => n.count), backgroundColor: ['#FFA8A8', '#B5E3FF'], borderWidth: 0 }],
  };

  return (
    <div className="dashboard-container">
      {/* Custom CSS for colorful styling */}
      <style>{`
        .dashboard-container {
          background: #f8f9fc;
        }
        .gradient-card {
          border: none;
          border-radius: 1.25rem;
          transition: transform 0.2s, box-shadow 0.2s;
          overflow: hidden;
        }
        .gradient-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 1rem 2rem rgba(0,0,0,0.1) !important;
        }
        .stat-card {
          background: white;
          border-left: 6px solid;
          border-radius: 1rem;
        }
        .chart-card {
          border-radius: 1.25rem;
          border: none;
          box-shadow: 0 6px 18px rgba(0,0,0,0.05);
          transition: all 0.2s;
        }
        .chart-card:hover {
          box-shadow: 0 12px 24px rgba(0,0,0,0.1);
        }
        .card-header-custom {
          // background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          // color: white;
          border-radius: 1.25rem 1.25rem 0 0 !important;
          padding: 1rem 1.25rem;
          font-weight: 600;
        }
        .table-custom th {
          background: #f1f5f9;
          color: #1e293b;
          font-weight: 600;
        }
        .badge-soft-primary {
          background: #e0e7ff;
          color: #4338ca;
        }
      `}</style>

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          ✨  Dashboard
        </h2>
      </div>

      {/* Stats Row 1 - Colorful Cards */}
      <div className="row g-4 mb-4">
        <div className="col-md-3">
          <div className="gradient-card card shadow-sm h-100" style={{ borderLeft: '6px solid #4F46E5', background: 'linear-gradient(145deg, #ffffff 0%, #f8faff 100%)' }}>
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>
                  <p className="text-muted mb-1">👨‍👩‍👧‍👦 Total Parents</p>
                  <h2 className="fw-bold text-primary">{overview.total_parents}</h2>
                </div>
                <div className="rounded-circle bg-primary bg-opacity-10 p-3"><i className="bi bi-people fs-2 text-primary"></i></div>
              </div>
              <small className="text-success">⬆️ +{users.new_this_month} this month</small>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="gradient-card card shadow-sm h-100" style={{ borderLeft: '6px solid #10B981', background: 'linear-gradient(145deg, #ffffff 0%, #f0fdf4 100%)' }}>
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div><p className="text-muted mb-1">🧒 Total Children</p><h2 className="fw-bold text-success">{overview.total_children}</h2></div>
                <div className="rounded-circle bg-success bg-opacity-10 p-3"><i className="bi bi-heart fs-2 text-success"></i></div>
              </div>
              <small className="text-success">⬆️ +{children.new_this_month} new</small>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="gradient-card card shadow-sm h-100" style={{ borderLeft: '6px solid #F59E0B', background: 'linear-gradient(145deg, #ffffff 0%, #fffbeb 100%)' }}>
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div><p className="text-muted mb-1">🎙️ Script Logs</p><h2 className="fw-bold text-warning">{overview.total_script_logs}</h2></div>
                <div className="rounded-circle bg-warning bg-opacity-10 p-3"><i className="bi bi-mic fs-2 text-warning"></i></div>
              </div>
              <small className="text-success">⬆️ +{script_logs.new_this_month} this month</small>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="gradient-card card shadow-sm h-100" style={{ borderLeft: '6px solid #EC4899', background: 'linear-gradient(145deg, #ffffff 0%, #fdf2f8 100%)' }}>
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div><p className="text-muted mb-1">🎯 Activities</p><h2 className="fw-bold text-danger">{overview.total_activities}</h2></div>
                <div className="rounded-circle bg-danger bg-opacity-10 p-3"><i className="bi bi-grid fs-2 text-danger"></i></div>
              </div>
              <small className="text-muted">{activities.active} active</small>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Row 2 - Smaller colorful cards */}
      <div className="row g-4 mb-4">
        <div className="col-md-3"><div className="stat-card card p-3 shadow-sm" style={{ borderLeftColor: '#3B82F6' }}><div className="d-flex justify-content-between"><span>✅ Verification Rate</span><span className="fw-bold">{engagement.verification_rate}%</span></div><div className="progress mt-2" style={{ height: '6px' }}><div className="progress-bar bg-info" style={{ width: `${engagement.verification_rate}%` }}></div></div></div></div>
        <div className="col-md-3"><div className="stat-card card p-3 shadow-sm" style={{ borderLeftColor: '#10B981' }}><div className="d-flex justify-content-between"><span>📊 Avg Scripts/Parent</span><span className="fw-bold">{engagement.avg_scripts_per_parent}</span></div><small>Active users: {script_logs.active_users}</small></div></div>
        <div className="col-md-3"><div className="stat-card card p-3 shadow-sm" style={{ borderLeftColor: '#F97316' }}><div className="d-flex justify-content-between"><span>📈 Script Usage</span><span className="fw-bold">{engagement.script_usage_percentage}%</span></div><small>of parents using scripts</small></div></div>
        <div className="col-md-3"><div className="stat-card card p-3 shadow-sm" style={{ borderLeftColor: '#8B5CF6' }}><div className="d-flex justify-content-between"><span>👨‍👩‍👧 Children/Parent</span><span className="fw-bold">{engagement.avg_children_per_parent}</span></div><small>Average</small></div></div>
      </div>

      {/* Charts Row */}
      <div className="row g-4 mb-4">
        <div className="col-lg-6"><div className="chart-card card"><div className="card-header-custom">📈 Script Logs Trend</div><div className="card-body"><Chart type="line" data={{ labels: scriptTrend.labels, datasets: [{ label: 'Scripts', data: scriptTrend.counts, borderColor: '#FF9F4A', backgroundColor: 'rgba(255,159,74,0.1)', tension: 0.3, fill: true, pointBackgroundColor: '#FF9F4A', pointBorderColor: '#fff', pointRadius: 5 }] }} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} /></div></div></div>
        <div className="col-lg-6"><div className="chart-card card"><div className="card-header-custom">👥 User Registration Trend</div><div className="card-body"><Chart type="line" data={{ labels: userTrend.labels, datasets: [{ label: 'New Users', data: userTrend.counts, borderColor: '#6C63FF', backgroundColor: 'rgba(108,99,255,0.1)', tension: 0.3, fill: true, pointBackgroundColor: '#6C63FF', pointBorderColor: '#fff', pointRadius: 5 }] }} options={{ responsive: true }} /></div></div></div>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-md-4"><div className="chart-card card"><div className="card-header-custom">⚧ Gender Distribution</div><div className="card-body d-flex justify-content-center"><div style={{ width: 220, height: 220 }}><Chart type="pie" data={genderChartData} options={{ plugins: { legend: { position: 'bottom' } } }} /></div></div></div></div>
        <div className="col-md-4"><div className="chart-card card"><div className="card-header-custom">🗣️ Communication Levels</div><div className="card-body"><Chart type="bar" data={communicationChartData} options={{ plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true } } }} /></div></div></div>
        <div className="col-md-4"><div className="chart-card card"><div className="card-header-custom">🎨 Activities by Category</div><div className="card-body"><Chart type="bar" data={activitiesChartData} options={{ plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true } } }} /></div></div></div>
      </div>

      {/* <div className="row g-4 mb-4">
        <div className="col-md-6"><div className="chart-card card"><div className="card-header-custom">🧠 Top Behaviors (Script Logs)</div><div className="card-body"><Chart type="bar" data={behaviorChartData} options={{ indexAxis: 'y', plugins: { legend: { display: false } }, scales: { x: { beginAtZero: true } } }} /></div></div></div>
        <div className="col-md-6"><div className="chart-card card"><div className="card-header-custom">🔔 Notifications by Type</div><div className="card-body d-flex justify-content-center"><div style={{ width: 220, height: 220 }}><Chart type="pie" data={notificationsChartData} options={{ plugins: { legend: { position: 'bottom' } } }} /></div></div></div></div>
      </div> */}

      {/* Additional Metrics */}
      {/* <div className="row g-4 mb-4">
        <div className="col-md-4"><div className="chart-card card"><div className="card-header-custom">📅 Recent Activity (7 days)</div><div className="card-body"><ul className="list-group list-group-flush"><li className="list-group-item d-flex justify-content-between">New Users<span className="badge bg-info rounded-pill">{recent_activity_7_days.new_users}</span></li><li className="list-group-item d-flex justify-content-between">New Children<span className="badge bg-success rounded-pill">{recent_activity_7_days.new_children}</span></li><li className="list-group-item d-flex justify-content-between">New Scripts<span className="badge bg-warning rounded-pill">{recent_activity_7_days.new_scripts}</span></li><li className="list-group-item d-flex justify-content-between">New Messages<span className="badge bg-danger rounded-pill">{recent_activity_7_days.new_messages}</span></li></ul></div></div></div>
        <div className="col-md-4"><div className="chart-card card"><div className="card-header-custom">🔔 Notifications Summary</div><div className="card-body"><div className="d-flex justify-content-between mb-2">Total: <strong>{notifications.total}</strong></div><div className="d-flex justify-content-between mb-2">Unread: <strong className="text-warning">{notifications.unread}</strong></div><div className="d-flex justify-content-between">New this month: <strong className="text-success">{notifications.new_this_month}</strong></div></div></div></div>
        <div className="col-md-4"><div className="chart-card card"><div className="card-header-custom">💬 Contact Messages</div><div className="card-body"><div className="d-flex justify-content-between mb-2">Total: <strong>{contact_messages.total}</strong></div><div className="d-flex justify-content-between">New this month: <strong className="text-success">{contact_messages.new_this_month}</strong></div></div></div></div>
      </div> */}

      {/* Top Users Table */}
      <div className="chart-card card mb-4">
        <div className="card-header-custom">🏆 Top Users by Script Activity</div>
        <div className="card-body p-0">
          <table className="table table-hover mb-0 table-custom">
            <thead><tr><th>Rank</th><th>Full Name</th><th>Email</th><th>Scripts</th></tr></thead>
            <tbody>{top_users.map((user, idx) => (<tr key={user.parent_id}><td>{idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : idx + 1}</td><td className="fw-semibold">{user.full_name}</td><td>{user.email}</td><td><span className="badge bg-primary rounded-pill">{user.script_count}</span></td></tr>))}</tbody>
          </table>
        </div>
      </div>

      {/* Footer Stats */}
      <div className="row g-4">
        <div className="col-md-3"><div className="card text-center p-3 shadow-sm" style={{ background: 'linear-gradient(145deg, #FFF0F5, #FFE4E9)' }}><h6>Total FAQs</h6><h3 className="fw-bold text-danger">{overview.total_faqs}</h3></div></div>
        <div className="col-md-3"><div className="card text-center p-3 shadow-sm" style={{ background: 'linear-gradient(145deg, #E8F4FF, #D9EEFF)' }}><h6>Total Stages</h6><h3 className="fw-bold text-info">{overview.total_stages}</h3><small>Stage Hub</small></div></div>
        <div className="col-md-3"><div className="card text-center p-3 shadow-sm" style={{ background: 'linear-gradient(145deg, #F0FFF0, #E0FFE0)' }}><h6>Total Scripts in Activities</h6><h3 className="fw-bold text-success">{activities.total_scripts}</h3></div></div>
        <div className="col-md-3"><div className="card text-center p-3 shadow-sm" style={{ background: 'linear-gradient(145deg, #FFF7E0, #FFEFC0)' }}><h6>Custom Activities</h6><h3 className="fw-bold text-warning">{activities.custom}</h3><small>of {activities.total}</small></div></div>
      </div>
    </div>
  );
};

export default Dashboard;