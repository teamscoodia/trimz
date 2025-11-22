// app/booking/page.tsx
'use client';

import { useMemo, useState } from 'react';
import { employees, services, todaysSlots, EmployeeId } from '@/lib/data';

type PaymentMethod = 'card' | 'gpay' | 'other';

export default function BookingPage() {
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<EmployeeId>('pervaiz');
  const [selectedServiceId, setSelectedServiceId] = useState<string>('cutting');
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);
  const [clientName, setClientName] = useState('');
  const [clientContact, setClientContact] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [confirmed, setConfirmed] = useState(false);

  const selectedEmployee = employees.find((e) => e.id === selectedEmployeeId)!;
  const selectedService = services.find((s) => s.id === selectedServiceId)!;

  const employeeServices = useMemo(
    () =>
      services.filter((s) =>
        s.employees.includes(selectedEmployeeId)
      ),
    [selectedEmployeeId]
  );

  const slotsForEmployee = todaysSlots.filter(
    (slot) => slot.employeeId === selectedEmployeeId
  );

  const handleConfirm = () => {
    if (!selectedSlotId || !clientName || !clientContact) {
      setConfirmed(false);
      alert('Please select slot, service, and fill client name + mobile.');
      return;
    }
    setConfirmed(true);
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Book appointment</h1>
          <p className="page-subtitle">
            Choose staff, service, time slot, and simulate online payment for Trimz.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="surface">
          <h2 className="section-title">Client & booking details</h2>
          <p className="section-subtitle">
            Basic details, preferred staff and service. All static for now.
          </p>

          <div className="field-group" style={{ marginTop: '0.8rem' }}>
            <div className="field">
              <label className="field-label">Client name</label>
              <input
                className="field-input"
                placeholder="Client full name"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
              />
            </div>
            <div className="field">
              <label className="field-label">Mobile number</label>
              <input
                className="field-input"
                placeholder="+971 5x xxx xxxx"
                value={clientContact}
                onChange={(e) => setClientContact(e.target.value)}
              />
            </div>
            <div className="field">
              <label className="field-label">Email (optional)</label>
              <input
                className="field-input"
                placeholder="client@email.com"
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="field-group" style={{ marginTop: '0.9rem' }}>
            <div className="field">
              <label className="field-label">Date</label>
              <input
                type="date"
                className="field-input"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className="field">
              <label className="field-label">Choose staff</label>
              <select
                className="field-select"
                value={selectedEmployeeId}
                onChange={(e) => {
                  const id = e.target.value as EmployeeId;
                  setSelectedEmployeeId(id);
                  const firstService = services.find((s) => s.employees.includes(id));
                  if (firstService) setSelectedServiceId(firstService.id);
                  setSelectedSlotId(null);
                  setConfirmed(false);
                }}
              >
                {employees.map((emp) => (
                  <option key={emp.id} value={emp.id}>
                    {emp.name} · {emp.role}
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
              <label className="field-label">Service</label>
              <select
                className="field-select"
                value={selectedServiceId}
                onChange={(e) => {
                  setSelectedServiceId(e.target.value);
                  setConfirmed(false);
                }}
              >
                {employeeServices.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.name} · AED {service.price}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="surface-muted">
          <h2 className="section-title">Available time slots</h2>
          <p className="section-subtitle">
            Showing static slots for today for {selectedEmployee.name}. Booked slots are
            locked; free slots are selectable.
          </p>

          <div className="slot-grid">
            {slotsForEmployee.map((slot) => {
              const isSelected = slot.id === selectedSlotId;
              const isBooked = slot.booked;
              const classNames =
                'slot ' +
                (isBooked ? 'slot-booked' : 'slot-available') +
                (isSelected ? ' slot-selected' : '');

              return (
                <button
                  key={slot.id}
                  type="button"
                  className={classNames}
                  disabled={isBooked}
                  onClick={() => {
                    if (!isBooked) {
                      setSelectedSlotId(slot.id);
                      setConfirmed(false);
                    }
                  }}
                >
                  {slot.start}–{slot.end}
                  {isBooked && (
                    <span style={{ display: 'block', fontSize: '0.7rem' }}>
                      Booked
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="surface-muted">
          <h2 className="section-title">Payment method</h2>
          <p className="section-subtitle">
            Static front-end only: card, GPay or other wallet. Integrate real gateway
            later.
          </p>

          <div className="payment-options">
            <label className="payment-option">
              <input
                type="radio"
                name="payment"
                checked={paymentMethod === 'card'}
                onChange={() => setPaymentMethod('card')}
              />
              <span>Card · Visa / Master / Debit</span>
            </label>
            <label className="payment-option">
              <input
                type="radio"
                name="payment"
                checked={paymentMethod === 'gpay'}
                onChange={() => setPaymentMethod('gpay')}
              />
              <span>GPay</span>
            </label>
            <label className="payment-option">
              <input
                type="radio"
                name="payment"
                checked={paymentMethod === 'other'}
                onChange={() => setPaymentMethod('other')}
              />
              <span>Other wallet</span>
            </label>
          </div>

          <div
            style={{
              marginTop: '0.9rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '1rem',
              flexWrap: 'wrap',
            }}
          >
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              <div>
                <strong>Summary: </strong>
                {selectedService.name} with {selectedEmployee.name}
              </div>
              <div>
                AED {selectedService.price} · {selectedService.durationMins} min ·{' '}
                {date}
              </div>
            </div>

            <button type="button" className="btn" onClick={handleConfirm}>
              Confirm booking &amp; pay
            </button>
          </div>

          {confirmed && (
            <div className="alert alert-success">
              <div className="alert-title">Payment captured · Booking created</div>
              <div className="alert-body">
                SMS / WhatsApp and email (to <strong>{clientContact}</strong>
                {clientEmail && (
                  <>
                    {' '}
                    &amp; <strong>{clientEmail}</strong>
                  </>
                )}
                ) will be sent with appointment time and payment receipt. A copy also goes
                instantly to the owner / manager number and email.
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
