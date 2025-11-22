// app/page.tsx
import Link from 'next/link';
import { employees, services, todaysSlots } from '@/lib/data';

export default function DashboardPage() {
  const totalRevenue = todaysSlots.reduce((sum, slot) => sum + (slot.amount ?? 0), 0);
  const completedCount = todaysSlots.filter((s) => s.booked).length;
  const totalSlots = todaysSlots.length;

  const averageTicket =
    completedCount > 0 ? Math.round((totalRevenue / completedCount) * 10) / 10 : 0;

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Today at Trimz</h1>
          <p className="page-subtitle">
            Overview of services, appointments, and performance for your gents saloon.
          </p>
        </div>
        <div className="hero-actions">
          <Link href="/booking" className="btn">
            Book new client
          </Link>
          <Link href="/admin" className="btn btn-secondary">
            View full day report
          </Link>
        </div>
      </div>

      <section className="section">
        <div className="stat-row">
          <div className="stat-card">
            <span className="stat-label">Total earning · today</span>
            <span className="stat-value">AED {totalRevenue}</span>
            <span className="stat-meta">
              From {completedCount} completed appointments
            </span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Team on floor</span>
            <span className="stat-value">{employees.length}</span>
            <span className="stat-meta">
              Pervaiz · Fayyaz · Jessica · Francis
            </span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Average ticket</span>
            <span className="stat-value">AED {averageTicket}</span>
            <span className="stat-meta">
              {completedCount}/{totalSlots} slots booked
            </span>
          </div>
        </div>
      </section>

      <section className="section hero-wrapper">
        <div className="hero-panel">
          <div>
            <div className="hero-title-large">
              LUXE&nbsp;<span className="hero-highlight">GENTS</span>
              <br />
              GROOMING.
            </div>
            <p className="hero-text">
              Trimz combines sharp barbering with spa-level care. Centralize all bookings,
              staff performance, and payments in one clean console.
            </p>
            <div className="hero-actions">
              <Link href="/booking" className="btn">
                Book now
              </Link>
              <Link href="/services" className="btn btn-secondary">
                View full services
              </Link>
            </div>
            <p className="hero-caption">
              • Online payments via card / wallet · SMS &amp; email notifications · Staff
              revenue tracking
            </p>
          </div>
        </div>

        <div className="surface">
          <h2 className="section-title">Live staff snapshot</h2>
          <p className="section-subtitle">
            Each stylist with today’s slots, completed work, and revenue.
          </p>

          <div className="service-grid">
            {employees.map((emp) => {
              const slots = todaysSlots.filter((s) => s.employeeId === emp.id);
              const completed = slots.filter((s) => s.booked);
              const revenue = completed.reduce((sum, s) => sum + (s.amount ?? 0), 0);

              return (
                <div key={emp.id} className="service-card">
                  <div className="service-header">
                    <div>
                      <div className="service-name">{emp.name}</div>
                      <div className="service-duration">{emp.role}</div>
                    </div>
                    <span className="chip chip-outline">
                      {emp.type === 'Male' ? 'Gents' : 'Premium Care'}
                    </span>
                  </div>
                  <div className="service-meta">
                    <span className="service-price">AED {revenue}</span>
                    <span className="service-duration">
                      {completed.length} done · {slots.length - completed.length} open
                    </span>
                  </div>
                  <div className="service-footer">
                    <span className="badge badge-muted">
                      Slots today: {slots.length}
                    </span>
                    {revenue > 0 && (
                      <span className="badge badge-success">Active · earning</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
