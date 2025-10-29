import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { bookingService } from '../services/api';
import type { Booking } from '../types';

export default function ResultPage() {
  const { reference } = useParams<{ reference: string }>();
  const navigate = useNavigate();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (reference) {
      loadBooking(reference);
    }
  }, [reference]);

  const loadBooking = async (ref: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await bookingService.getBookingByReference(ref);
      setBooking(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load booking details');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner message="Loading booking details..." />;
  if (error) return <ErrorMessage message={error} onRetry={() => loadBooking(reference!)} />;
  if (!booking) return <ErrorMessage message="Booking not found" />;

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center py-12">
      <div className="max-w-md w-full mx-auto px-4">
        {/* Success Icon */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-green-500 rounded-full mb-6">
            <CheckCircle className="w-16 h-16 text-white" strokeWidth={3} />
          </div>
          
          {/* Booking Confirmed */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Booking Confirmed
          </h1>
          
          {/* Reference ID */}
          <p className="text-gray-600 text-sm">
            Ref ID: <span className="font-semibold">{booking.booking_reference}</span>
          </p>
        </div>

        {/* Back to Home Button */}
        <button
          onClick={() => navigate('/')}
          className="w-full bg-gray-300 hover:bg-gray-400 text-gray-900 font-medium py-3 rounded-lg transition-colors"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
