// app/admin/page.tsx
import { employees, todaysSlots, services } from '@/lib/data';

export default function AdminPage() {
  const perEmployee = employees.map((emp) => {
    const slots = todaysSlots.filter((s) => s.employeeId === emp.id);
    const completed = slots.filter((s) => s.booked);
    const revenue = completed.reduce((sum, s) => sum + (s.amount ?? 0), 0);

    return {
      ...emp,
      totalSlots: slots.length,
      completedSlots: completed.length,
      revenue,
    };
  });

  const totalRevenue = perEmployee.reduce((sum, e) => sum + e.revenue, 0);
  const totalCompleted = perEmployee.reduce((sum, e) => sum + e.completedSlots, 0);
  const totalSlots = todaysSlots.length;

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Admin · Daily report</h1>
          <p className="page-subtitle">
            Full day earnings, per-employee work, and time slots for Trimz.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="stat-row">
          <div className="stat-card">
            <span className="stat-label">Total earning today</span>
            <span className="stat-value">AED {totalRevenue}</span>
            <span className="stat-meta">
              {totalCompleted}/{totalSlots} slots booked
            </span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Employees working</span>
            <span className="stat-value">{employees.length}</span>
            <span className="stat-meta">Includes barber & premium care team</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Utilization</span>
            <span className="stat-value">
              {totalSlots > 0
                ? Math.round((totalCompleted / totalSlots) * 100)
                : 0}
              %
            </span>
            <span className="stat-meta">Percent of slots filled</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="surface">
          <h2 className="section-title">Employee revenue breakdown</h2>
          <p className="section-subtitle">
            Per-employee sale for the full day: amount and how many appointments they
            handled.
          </p>

          <div className="service-grid">
            {perEmployee.map((emp) => (
              <div key={emp.id} className="service-card">
                <div className="service-header">
                  <div>
                    <div className="service-name">{emp.name}</div>
                    <div className="service-duration">{emp.role}</div>
                  </div>
                  <span className="chip">
                    {emp.type === 'Male' ? 'Male services' : 'Premium care'}
                  </span>
                </div>
                <div className="service-meta">
                  <span className="service-price">AED {emp.revenue}</span>
                  <span className="service-duration">
                    {emp.completedSlots} done / {emp.totalSlots} slots
                  </span>
                </div>
                <div className="service-footer">
                  <span className="badge badge-muted">
                    Utilization:{' '}
                    {emp.totalSlots > 0
                      ? Math.round((emp.completedSlots / emp.totalSlots) * 100)
                      : 0}
                    %
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="surface-muted">
          <h2 className="section-title">Time slot timeline</h2>
          <p className="section-subtitle">
            Every time slot for each staff member, with service and amount if booked.
          </p>

          <div className="table-wrapper">
            <table className="table">
              <thead>
                <tr>
                  <th>Staff</th>
                  <th>Type</th>
                  <th>Time</th>
                  <th>Status</th>
                  <th>Service</th>
                  <th>Client</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {todaysSlots.map((slot) => {
                  const emp = employees.find((e) => e.id === slot.employeeId)!;
                  const service = slot.serviceId
                    ? services.find((s) => s.id === slot.serviceId)
                    : undefined;

                  return (
                    <tr key={slot.id}>
                      <td>{emp.name}</td>
                      <td>{emp.type}</td>
                      <td>
                        {slot.start}–{slot.end}
                      </td>
                      <td>{slot.booked ? 'Worked' : 'Free'}</td>
                      <td>{service ? service.name : '—'}</td>
                      <td>{slot.clientName ?? '—'}</td>
                      <td>{slot.amount ? `AED ${slot.amount}` : '—'}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
