import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Helmet } from "react-helmet";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Calendar, Mail, Loader2 } from "lucide-react";
import { Link } from "wouter";

interface BookingDetails {
  id: number;
  clientName: string;
  clientEmail: string;
  date: string;
  startTime: string;
  endTime: string;
}

export default function BookingSuccess() {
  const [location] = useLocation();
  const [booking, setBooking] = useState<BookingDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get('session_id');

    if (!sessionId) {
      setError("No session ID found");
      setLoading(false);
      return;
    }

    fetch(`/api/verify-payment/${sessionId}`)
      .then(res => res.json())
      .then(data => {
        if (data.booking) {
          setBooking(data.booking);
        } else {
          setError(data.message || "Failed to verify payment");
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Error verifying payment:", err);
        setError("Failed to verify payment");
        setLoading(false);
      });
  }, []);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-GB', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  return (
    <>
      <Helmet>
        <title>Booking Confirmed | ADTS - IT Consultancy</title>
        <meta name="description" content="Your booking has been confirmed. Thank you for choosing ADTS IT Consultancy services." />
      </Helmet>

      <Header />

      <main className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10 py-16">
        <div className="container mx-auto px-4 max-w-2xl">
          {loading ? (
            <Card className="text-center">
              <CardContent className="py-16">
                <Loader2 className="w-16 h-16 mx-auto text-primary animate-spin mb-4" />
                <p className="text-lg text-muted-foreground">Verifying your payment...</p>
              </CardContent>
            </Card>
          ) : error ? (
            <Card className="text-center">
              <CardContent className="py-16">
                <div className="text-red-500 text-6xl mb-4">!</div>
                <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
                <p className="text-muted-foreground mb-6">{error}</p>
                <Link href="/booking">
                  <Button>Try Again</Button>
                </Link>
              </CardContent>
            </Card>
          ) : booking ? (
            <Card>
              <CardHeader className="text-center border-b">
                <div className="mx-auto mb-4">
                  <CheckCircle className="w-20 h-20 text-green-500" />
                </div>
                <CardTitle className="text-3xl text-green-600">Booking Confirmed!</CardTitle>
                <p className="text-muted-foreground mt-2">
                  Thank you for your booking. A confirmation email has been sent to your email address.
                </p>
              </CardHeader>
              <CardContent className="py-8">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <Calendar className="w-6 h-6 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg">Appointment Details</h3>
                      <p className="text-muted-foreground">{formatDate(booking.date)}</p>
                      <p className="text-muted-foreground">{formatTime(booking.startTime)} - {formatTime(booking.endTime)}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Mail className="w-6 h-6 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg">Confirmation Sent To</h3>
                      <p className="text-muted-foreground">{booking.clientEmail}</p>
                    </div>
                  </div>

                  <div className="bg-muted/50 rounded-lg p-4 mt-6">
                    <p className="text-sm text-muted-foreground">
                      <strong>What's next?</strong> You'll receive a confirmation email with meeting details. 
                      If you have any questions before your appointment, please contact us at{' '}
                      <a href="mailto:AD@adtechservices.co.uk" className="text-primary hover:underline">
                        AD@adtechservices.co.uk
                      </a>
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 mt-8">
                    <Link href="/" className="flex-1">
                      <Button variant="outline" className="w-full">Back to Home</Button>
                    </Link>
                    <Link href="/booking" className="flex-1">
                      <Button className="w-full">Book Another Consultation</Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : null}
        </div>
      </main>

      <Footer />
    </>
  );
}
