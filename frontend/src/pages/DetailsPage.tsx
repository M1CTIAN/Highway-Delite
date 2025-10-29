import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { experienceService } from '../services/api';
import type { Experience, Slot } from '../types';

export default function DetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [experience, setExperience] = useState<Experience | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [numberOfPeople, setNumberOfPeople] = useState(1);

  useEffect(() => {
    if (id) {
      loadExperience(id);
    }
  }, [id]);

  const loadExperience = async (experienceId: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await experienceService.getExperienceById(experienceId);
      setExperience(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load experience');
    } finally {
      setLoading(false);
    }
  };

  const handleBookNow = () => {
    if (!selectedSlot || !experience) return;

    navigate('/checkout', {
      state: {
        experience,
        slot: selectedSlot,
        numberOfPeople,
      },
    });
  };

  const groupSlotsByDate = (slots: Slot[]) => {
    const grouped: Record<string, Slot[]> = {};
    slots.forEach((slot: any) => {
      // Access the date from the _doc property if it exists, otherwise use the slot directly
      const slotData = slot._doc || slot;
      const date = slotData.date;
      
      if (!grouped[date]) {
        grouped[date] = [];
      }
      // Push the actual slot data, not the mongoose wrapper
      grouped[date].push({
        ...slotData,
        id: slot.id || slotData._id
      });
    });
    return grouped;
  };

  const formatDate = (dateString: string) => {
    // Parse the date string (expected format: YYYY-MM-DD)
    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, day); // month is 0-indexed in JS
    
    const monthName = date.toLocaleDateString('en-US', { month: 'short' });
    return `${monthName} ${day}`;
  };



  if (loading) return <LoadingSpinner message="Loading experience details..." />;
  if (error) return <ErrorMessage message={error} onRetry={() => loadExperience(id!)} />;
  if (!experience) return <ErrorMessage message="Experience not found" />;

  const groupedSlots = experience.slots ? groupSlotsByDate(experience.slots) : {};
  const totalAmount = selectedSlot ? selectedSlot.price * numberOfPeople : 0;
  const taxAmount = totalAmount > 0 ? Math.round(totalAmount * 0.05) : 0;
  const finalAmount = totalAmount + taxAmount;

  return (
    <div className="bg-white min-h-screen">
      <div className="container py-6">
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6 text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Details
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Image and Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Main Image */}
            <div className="relative h-96 rounded-2xl overflow-hidden">
              <img
                src={experience.image_url}
                alt={experience.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Title and Description */}
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-3">
                {experience.title}
              </h1>
              <p className="text-gray-600 text-sm leading-relaxed">
                {experience.description}
              </p>
            </div>

            {/* Choose Date */}
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-4">Choose date</h2>
              <div className="flex gap-3 overflow-x-auto pb-2">
                {Object.keys(groupedSlots).slice(0, 5).map((date) => (
                  <button
                    key={date}
                    onClick={() => {
                      setSelectedDate(date);
                      setSelectedSlot(null);
                    }}
                    className={`flex-shrink-0 px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                      selectedDate === date
                        ? 'bg-yellow-400 border-yellow-400 text-gray-900'
                        : 'bg-white border-gray-300 text-gray-700 hover:border-yellow-400'
                    }`}
                  >
                    {formatDate(date)}
                  </button>
                ))}
              </div>
            </div>

            {/* Choose Time */}
            {selectedDate && (
              <div>
                <h2 className="text-lg font-bold text-gray-900 mb-4">Choose time</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {groupedSlots[selectedDate]?.map((slot) => (
                    <button
                      key={slot.id}
                      onClick={() => setSelectedSlot(slot)}
                      disabled={slot.available_spots === 0}
                      className={`p-3 rounded-lg border text-sm transition-colors ${
                        selectedSlot?.id === slot.id
                          ? 'bg-yellow-400 border-yellow-400 text-gray-900 font-semibold'
                          : slot.available_spots === 0
                          ? 'bg-gray-200 border-gray-300 text-gray-400 cursor-not-allowed'
                          : 'bg-white border-gray-300 text-gray-700 hover:border-yellow-400'
                      }`}
                    >
                      <div className="font-medium">{slot.time_slot.split(' - ')[0]}</div>
                      <div className="text-xs mt-1">
                        {slot.available_spots === 0 ? (
                          <span className="text-red-600 font-medium">Sold out</span>
                        ) : (
                          <span className="text-green-600">{slot.available_spots} left</span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-3">
                  All times are in IST (GMT +5:30)
                </p>
              </div>
            )}

            {/* About */}
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-3">About</h2>
              <p className="text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
                {experience.description}
              </p>
            </div>
          </div>

          {/* Right Column - Booking Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-xl p-6 sticky top-6">
              <div className="space-y-4">
                {/* Starts At */}
                <div className="flex justify-between items-start">
                  <span className="text-sm text-gray-600">Starts at</span>
                  <span className="text-xl font-bold text-gray-900">
                    ₹{(selectedSlot?.price || experience.base_price).toLocaleString('en-IN')}
                  </span>
                </div>

                {/* Quantity Selector */}
                <div>
                  <label className="text-sm text-gray-600 block mb-2">Quantity</label>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setNumberOfPeople(Math.max(1, numberOfPeople - 1))}
                      className="w-10 h-10 rounded-lg border-2 border-gray-300 flex items-center justify-center text-gray-700 hover:border-gray-400 font-bold text-lg"
                      disabled={numberOfPeople <= 1}
                    >
                      −
                    </button>
                    <span className="text-2xl font-bold text-gray-900 min-w-[40px] text-center">
                      {numberOfPeople}
                    </span>
                    <button
                      onClick={() => setNumberOfPeople(numberOfPeople + 1)}
                      className="w-10 h-10 rounded-lg border-2 border-gray-300 flex items-center justify-center text-gray-700 hover:border-gray-400 font-bold text-lg"
                      disabled={selectedSlot ? numberOfPeople >= selectedSlot.available_spots : false}
                    >
                      +
                    </button>
                    {selectedSlot && (
                      <span className="ml-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                        {selectedSlot.available_spots} Left
                      </span>
                    )}
                  </div>
                </div>

                {/* Subtotal */}
                <div className="flex justify-between text-sm pt-3 border-t border-gray-200">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold text-gray-900">
                    ₹{totalAmount.toLocaleString('en-IN')}
                  </span>
                </div>

                {/* Taxes */}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Taxes</span>
                  <span className="font-semibold text-gray-900">
                    ₹{taxAmount.toLocaleString('en-IN')}
                  </span>
                </div>

                {/* Total */}
                <div className="flex justify-between text-lg pt-3 border-t-2 border-gray-300">
                  <span className="font-bold text-gray-900">Total</span>
                  <span className="font-bold text-gray-900">
                    ₹{finalAmount.toLocaleString('en-IN')}
                  </span>
                </div>

                {/* Confirm Button */}
                <button
                  onClick={handleBookNow}
                  disabled={!selectedSlot}
                  className="w-full bg-yellow-400 hover:bg-yellow-500 disabled:bg-gray-200 disabled:cursor-not-allowed text-gray-900 font-semibold py-3 rounded-lg transition-colors mt-4"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
