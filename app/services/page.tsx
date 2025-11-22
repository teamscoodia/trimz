// app/services/page.tsx
import { employees, services } from '@/lib/data';

export default function ServicesPage() {
  const maleServices = services.filter((s) => s.for === 'Male');
  const gayServices = services.filter((s) => s.for === 'Gay');

  const getEmployeeNames = (ids: typeof employees[number]['id'][]) =>
    ids.map((id) => employees.find((e) => e.id === id)?.name ?? '').join(' · ');

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Service Menu</h1>
          <p className="page-subtitle">
            All gents services at Trimz with duration, pricing, and assigned staff.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="surface-muted">
          <h2 className="section-title">Male services</h2>
          <p className="section-subtitle">
            Classic gents barber services: cutting, shaving, hair color and facial.
          </p>
          <div className="service-grid">
            {maleServices.map((service) => (
              <div key={service.id} className="service-card">
                <div className="service-header">
                  <div>
                    <div className="service-name">{service.name}</div>
                    <div className="service-description">{service.description}</div>
                  </div>
                  <span className="chip">Male</span>
                </div>
                <div className="service-meta">
                  <span className="service-price">AED {service.price}</span>
                  <span className="service-duration">
                    {service.durationMins} min service
                  </span>
                </div>
                <div className="service-footer">
                  <span>By: {getEmployeeNames(service.employees)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="surface-muted">
          <h2 className="section-title">Premium care services</h2>
          <p className="section-subtitle">
            Undershave, massage, manicure and pedicure handled by your grooming
            specialists.
          </p>
          <div className="service-grid">
            {gayServices.map((service) => (
              <div key={service.id} className="service-card">
                <div className="service-header">
                  <div>
                    <div className="service-name">{service.name}</div>
                    <div className="service-description">{service.description}</div>
                  </div>
                  <span className="chip">Premium</span>
                </div>
                <div className="service-meta">
                  <span className="service-price">AED {service.price}</span>
                  <span className="service-duration">
                    {service.durationMins} min service
                  </span>
                </div>
                <div className="service-footer">
                  <span>
                    By: {service.employees.map((id) => employees.find((e) => e.id === id)?.name).join(' · ')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
