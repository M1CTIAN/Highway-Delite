import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Check } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';
import { bookingService, promoService } from '../services/api';
import type { Experience, Slot, PromoCode } from '../types';

interface CheckoutState {
  experience: Experience;
  slot: Slot;
  numberOfPeople: number;
}

export default function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as CheckoutState;

  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<PromoCode | null>(null);
  const [promoError, setPromoError] = useState('');
  const [loading, setLoading] = useState(false);
  const [validatingPromo, setValidatingPromo] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!state || !state.experience || !state.slot) {
    navigate('/');
    return null;
  }

  const { experience, slot, numberOfPeople } = state;
  const baseAmount = slot.price * numberOfPeople;
  const taxAmount = Math.round(baseAmount * 0.05);
  const discountAmount = appliedPromo?.discount_amount || 0;
  const finalAmount = appliedPromo ? appliedPromo.final_amount + taxAmount : baseAmount + taxAmount;

  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!userName.trim()) {
      newErrors.userName = 'Name is required';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!userEmail.trim()) {
      newErrors.userEmail = 'Email is required';
    } else if (!emailRegex.test(userEmail)) {
      newErrors.userEmail = 'Invalid email address';
    }

    if (!agreeTerms) {
      newErrors.agreeTerms = 'You must agree to the terms';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleApplyPromo = async () => {
    if (!promoCode.trim()) return;

    try {
      setValidatingPromo(true);
      setPromoError('');
      const promo = await promoService.validatePromoCode(promoCode, baseAmount);
      setAppliedPromo(promo);
    } catch (error) {
      setPromoError(error instanceof Error ? error.message : 'Invalid promo code');
      setAppliedPromo(null);
    } finally {
      setValidatingPromo(false);
    }
  };

  const handleRemovePromo = () => {
    setPromoCode('');
    setAppliedPromo(null);
    setPromoError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);
      const booking = await bookingService.createBooking({
        experience_id: experience.id,
        slot_id: slot.id,
        user_name: userName,
        user_email: userEmail,
        user_phone: undefined,
        number_of_people: numberOfPeople,
        promo_code: appliedPromo?.code || undefined,
      });

      navigate(`/result/${booking.booking_reference}`, {
        state: { success: true },
      });
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Booking failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner message="Processing your booking..." />;
  }

  return (
    <div className="bg-white min-h-screen py-6">
      <div className="container">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6 text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Checkout
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Form - Left Side */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full name
                </label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-100 border-0 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:bg-white transition-all"
                  placeholder="Your name"
                />
                {errors.userName && (
                  <p className="text-red-600 text-sm mt-1">{errors.userName}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-100 border-0 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:bg-white transition-all"
                  placeholder="Your name"
                />
                {errors.userEmail && (
                  <p className="text-red-600 text-sm mt-1">{errors.userEmail}</p>
                )}
              </div>

              {/* Promo Code */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                  className="flex-1 px-4 py-3 bg-gray-100 border-0 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:bg-white transition-all"
                  placeholder="Promo code"
                  disabled={!!appliedPromo}
                />
                {!appliedPromo ? (
                  <button
                    type="button"
                    onClick={handleApplyPromo}
                    disabled={!promoCode || validatingPromo}
                    className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed font-medium transition-colors"
                  >
                    {validatingPromo ? 'Validating...' : 'Apply'}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleRemovePromo}
                    className="px-6 py-3 bg-gray-300 text-gray-900 rounded-lg hover:bg-gray-400 font-medium transition-colors"
                  >
                    Remove
                  </button>
                )}
              </div>
              {promoError && (
                <p className="text-red-600 text-sm">{promoError}</p>
              )}
              {appliedPromo && (
                <div className="flex items-center text-green-600 text-sm">
                  <Check className="w-4 h-4 mr-1" />
                  <span>Promo code applied! You saved ₹{discountAmount}</span>
                </div>
              )}

              {/* Terms Agreement */}
              <div className="flex items-start">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="mt-1 w-4 h-4 text-yellow-400 border-gray-300 rounded focus:ring-yellow-400"
                />
                <label className="ml-2 text-sm text-gray-600">
                  I agree to the terms and safety policy
                </label>
              </div>
              {errors.agreeTerms && (
                <p className="text-red-600 text-sm">{errors.agreeTerms}</p>
              )}
            </form>
          </div>

          {/* Summary - Right Side */}
          <div className="lg:col-span-2">
            <div className="bg-gray-50 rounded-xl p-6 space-y-4">
              {/* Booking Details */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Experience</span>
                  <span className="font-medium text-gray-900">{experience.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date</span>
                  <span className="font-medium text-gray-900">{formatDate(slot.date)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Time</span>
                  <span className="font-medium text-gray-900">{slot.time_slot.split(' - ')[0]}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Qty</span>
                  <span className="font-medium text-gray-900">{numberOfPeople}</span>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2 text-sm pt-4 border-t border-gray-200">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold text-gray-900">₹{baseAmount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Taxes</span>
                  <span className="font-semibold text-gray-900">₹{taxAmount.toLocaleString('en-IN')}</span>
                </div>
                {appliedPromo && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount ({appliedPromo.code})</span>
                    <span className="font-semibold">- ₹{discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}
              </div>

              {/* Total */}
              <div className="flex justify-between text-lg font-bold pt-4 border-t-2 border-gray-300">
                <span>Total</span>
                <span>₹{finalAmount.toLocaleString('en-IN')}</span>
              </div>

              {/* Pay Button */}
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full bg-yellow-400 hover:bg-yellow-500 disabled:bg-gray-200 disabled:cursor-not-allowed text-gray-900 font-semibold py-3 rounded-lg transition-colors"
              >
                {loading ? 'Processing...' : 'Pay and Confirm'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
