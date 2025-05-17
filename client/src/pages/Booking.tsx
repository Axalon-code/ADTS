import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

// Service type definition
interface Service {
  id: number;
  name: string;
  description: string;
  category: string;
  duration: number;
  price: number | null;
  isActive: boolean;
}

// Available time slot type definition
interface TimeSlot {
  startTime: string;
  endTime: string;
}

export default function BookingPage() {
  const [location] = useLocation();
  const params = new URLSearchParams(location.split('?')[1] || '');
  const initialServiceCategory = params.get("category") || "azure";
  const { toast } = useToast();
  
  // State for booking form
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    // Default to tomorrow
    new Date(new Date().setDate(new Date().getDate() + 1))
  );
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(null);
  const [step, setStep] = useState<"service" | "date" | "time" | "details">("service");
  
  // Form details
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientCompany, setClientCompany] = useState("");
  const [notes, setNotes] = useState("");
  
  // Fetch services by category
  const { data: services, isLoading: servicesLoading } = useQuery({
    queryKey: ['/api/services/category', initialServiceCategory],
    enabled: !!initialServiceCategory
  });
  
  // Fetch available time slots for the selected date and service
  const { data: availableSlots, isLoading: slotsLoading } = useQuery({
    queryKey: ['/api/available-slots', selectedDate?.toISOString().split('T')[0], selectedService],
    enabled: !!selectedDate && !!selectedService
  });
  
  // Set initial selected service based on the first service loaded
  useEffect(() => {
    if (services && services.length > 0 && !selectedService) {
      setSelectedService(services[0].id);
    }
  }, [services, selectedService]);
  
  // Step navigation functions
  const goToDateSelection = () => {
    if (!selectedService) {
      toast({
        title: "Please select a service",
        description: "You must select a service to continue.",
        variant: "destructive"
      });
      return;
    }
    setStep("date");
  };
  
  const goToTimeSelection = () => {
    if (!selectedDate) {
      toast({
        title: "Please select a date",
        description: "You must select a date to continue.",
        variant: "destructive"
      });
      return;
    }
    setStep("time");
  };
  
  const goToDetailsForm = () => {
    if (!selectedTimeSlot) {
      toast({
        title: "Please select a time slot",
        description: "You must select a time slot to continue.",
        variant: "destructive"
      });
      return;
    }
    setStep("details");
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedService || !selectedDate || !selectedTimeSlot) {
      toast({
        title: "Missing required fields",
        description: "Please complete all required booking information.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          serviceId: selectedService,
          clientName,
          clientEmail,
          clientPhone,
          clientCompany,
          date: selectedDate.toISOString().split('T')[0],
          startTime: selectedTimeSlot.startTime,
          endTime: selectedTimeSlot.endTime,
          notes
        }),
      });
      
      if (response.ok) {
        const result = await response.json();
        toast({
          title: "Booking Successful!",
          description: "Your appointment has been scheduled. Check your email for confirmation details.",
        });
        
        // Reset form
        setSelectedService(null);
        setSelectedDate(undefined);
        setSelectedTimeSlot(null);
        setClientName("");
        setClientEmail("");
        setClientPhone("");
        setClientCompany("");
        setNotes("");
        setStep("service");
      } else {
        const error = await response.json();
        throw new Error(error.message || "Failed to create booking");
      }
    } catch (error) {
      toast({
        title: "Booking Failed",
        description: error instanceof Error ? error.message : "There was an error processing your booking. Please try again.",
        variant: "destructive"
      });
    }
  };
  
  // Helper function to format time display
  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':');
    const date = new Date();
    date.setHours(parseInt(hours, 10));
    date.setMinutes(parseInt(minutes, 10));
    return format(date, 'h:mm a');
  };
  
  // Get currently selected service details
  const selectedServiceDetails = services?.find(
    (service: Service) => service.id === selectedService
  );
  
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold text-center mb-2">Book a Consultation</h1>
      <p className="text-muted-foreground text-center mb-8">
        Schedule a professional IT consultation tailored to your business needs
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left sidebar - booking steps */}
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Booking Steps</CardTitle>
              <CardDescription>Complete these steps to schedule your consultation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className={cn(
                  "p-3 rounded-md flex items-center",
                  step === "service" ? "bg-primary/10 border border-primary/50" : "hover:bg-muted"
                )}>
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium mr-3",
                    step === "service" ? "bg-primary text-white" : "bg-muted-foreground/20"
                  )}>1</div>
                  <div>
                    <h3 className="font-medium">Select Service</h3>
                    <p className="text-sm text-muted-foreground">Choose the service you require</p>
                  </div>
                </div>
                
                <div className={cn(
                  "p-3 rounded-md flex items-center",
                  step === "date" ? "bg-primary/10 border border-primary/50" : "hover:bg-muted"
                )}>
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium mr-3",
                    step === "date" ? "bg-primary text-white" : "bg-muted-foreground/20"
                  )}>2</div>
                  <div>
                    <h3 className="font-medium">Select Date</h3>
                    <p className="text-sm text-muted-foreground">Choose your preferred date</p>
                  </div>
                </div>
                
                <div className={cn(
                  "p-3 rounded-md flex items-center",
                  step === "time" ? "bg-primary/10 border border-primary/50" : "hover:bg-muted"
                )}>
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium mr-3",
                    step === "time" ? "bg-primary text-white" : "bg-muted-foreground/20"
                  )}>3</div>
                  <div>
                    <h3 className="font-medium">Select Time</h3>
                    <p className="text-sm text-muted-foreground">Choose an available time slot</p>
                  </div>
                </div>
                
                <div className={cn(
                  "p-3 rounded-md flex items-center",
                  step === "details" ? "bg-primary/10 border border-primary/50" : "hover:bg-muted"
                )}>
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium mr-3",
                    step === "details" ? "bg-primary text-white" : "bg-muted-foreground/20"
                  )}>4</div>
                  <div>
                    <h3 className="font-medium">Your Details</h3>
                    <p className="text-sm text-muted-foreground">Provide your contact information</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Selected booking summary */}
          {(selectedService || selectedDate || selectedTimeSlot) && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
                <CardDescription>Your consultation details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {selectedServiceDetails && (
                    <div>
                      <span className="text-sm text-muted-foreground block">Service:</span>
                      <span className="font-medium">{selectedServiceDetails.name}</span>
                      {selectedServiceDetails.price && (
                        <span className="ml-2 text-sm text-muted-foreground">
                          (£{(selectedServiceDetails.price / 100).toFixed(2)})
                        </span>
                      )}
                      <p className="text-sm text-muted-foreground mt-1">
                        Duration: {selectedServiceDetails.duration} minutes
                      </p>
                    </div>
                  )}
                  
                  {selectedDate && (
                    <div>
                      <span className="text-sm text-muted-foreground block">Date:</span>
                      <span className="font-medium">
                        {format(selectedDate, 'EEEE, MMMM d, yyyy')}
                      </span>
                    </div>
                  )}
                  
                  {selectedTimeSlot && (
                    <div>
                      <span className="text-sm text-muted-foreground block">Time:</span>
                      <span className="font-medium">
                        {formatTime(selectedTimeSlot.startTime)} - {formatTime(selectedTimeSlot.endTime)}
                      </span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
        
        {/* Right content - booking form */}
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>
                {step === "service" && "Select Service"}
                {step === "date" && "Select Date"}
                {step === "time" && "Select Time"}
                {step === "details" && "Your Details"}
              </CardTitle>
              <CardDescription>
                {step === "service" && "Choose the service you require assistance with"}
                {step === "date" && "Select your preferred consultation date"}
                {step === "time" && "Choose an available time slot"}
                {step === "details" && "Provide your contact information to complete booking"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Service Selection Step */}
              {step === "service" && (
                <div>
                  {servicesLoading ? (
                    <div className="py-8 text-center">Loading available services...</div>
                  ) : services && services.length > 0 ? (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 gap-4">
                        {services.map((service: Service) => (
                          <div
                            key={service.id}
                            className={cn(
                              "border rounded-lg p-4 cursor-pointer transition-colors",
                              selectedService === service.id 
                                ? "border-primary bg-primary/5" 
                                : "hover:border-primary/50"
                            )}
                            onClick={() => setSelectedService(service.id)}
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-medium text-lg">{service.name}</h3>
                                <p className="text-muted-foreground mt-1">{service.description}</p>
                                <div className="flex items-center mt-2 text-sm">
                                  <span className="text-muted-foreground">Duration: {service.duration} minutes</span>
                                  {service.price && (
                                    <>
                                      <Separator orientation="vertical" className="mx-2 h-4" />
                                      <span className="font-medium">£{(service.price / 100).toFixed(2)}</span>
                                    </>
                                  )}
                                </div>
                              </div>
                              <div className={cn(
                                "w-5 h-5 rounded-full border",
                                selectedService === service.id 
                                  ? "border-primary bg-primary" 
                                  : "border-muted-foreground/50"
                              )}>
                                {selectedService === service.id && (
                                  <div className="w-full h-full flex items-center justify-center">
                                    <div className="w-2 h-2 rounded-full bg-white"></div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <Button className="w-full" onClick={goToDateSelection}>Continue to Date Selection</Button>
                    </div>
                  ) : (
                    <div className="py-8 text-center">
                      <p>No services available in this category.</p>
                    </div>
                  )}
                </div>
              )}
              
              {/* Date Selection Step */}
              {step === "date" && (
                <div className="space-y-6">
                  <div className="flex flex-col items-center">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      initialFocus
                      disabled={(date) => {
                        // Disable dates in the past
                        const yesterday = new Date();
                        yesterday.setDate(yesterday.getDate() - 1);
                        return date < yesterday;
                      }}
                      className="rounded-md border mx-auto"
                    />
                  </div>
                  <div className="flex gap-4">
                    <Button variant="outline" className="w-full" onClick={() => setStep("service")}>
                      Go Back
                    </Button>
                    <Button className="w-full" onClick={goToTimeSelection}>
                      Continue to Time Selection
                    </Button>
                  </div>
                </div>
              )}
              
              {/* Time Selection Step */}
              {step === "time" && (
                <div className="space-y-6">
                  {slotsLoading ? (
                    <div className="py-8 text-center">Loading available time slots...</div>
                  ) : availableSlots && availableSlots.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {availableSlots.map((slot: TimeSlot, index: number) => (
                        <button
                          key={index}
                          className={cn(
                            "p-3 rounded-md border text-center transition-colors",
                            selectedTimeSlot && 
                            selectedTimeSlot.startTime === slot.startTime && 
                            selectedTimeSlot.endTime === slot.endTime
                              ? "border-primary bg-primary/5"
                              : "hover:border-primary/50"
                          )}
                          onClick={() => setSelectedTimeSlot(slot)}
                        >
                          <span className="block font-medium">{formatTime(slot.startTime)}</span>
                          <span className="text-sm text-muted-foreground">
                            to {formatTime(slot.endTime)}
                          </span>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="py-8 text-center">
                      <p>No available time slots for the selected date.</p>
                      <p className="text-sm text-muted-foreground mt-2">
                        Please select another date or service.
                      </p>
                    </div>
                  )}
                  <div className="flex gap-4">
                    <Button variant="outline" className="w-full" onClick={() => setStep("date")}>
                      Go Back
                    </Button>
                    <Button 
                      className="w-full" 
                      onClick={goToDetailsForm}
                      disabled={!selectedTimeSlot}
                    >
                      Continue to Details
                    </Button>
                  </div>
                </div>
              )}
              
              {/* Details Form Step */}
              {step === "details" && (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="clientName" className="text-sm font-medium">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="clientName"
                        className="w-full p-2 border rounded-md"
                        type="text"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="clientEmail" className="text-sm font-medium">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="clientEmail"
                        className="w-full p-2 border rounded-md"
                        type="email"
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="clientPhone" className="text-sm font-medium">
                        Phone Number
                      </label>
                      <input
                        id="clientPhone"
                        className="w-full p-2 border rounded-md"
                        type="tel"
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="clientCompany" className="text-sm font-medium">
                        Company Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="clientCompany"
                        className="w-full p-2 border rounded-md"
                        type="text"
                        value={clientCompany}
                        onChange={(e) => setClientCompany(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="notes" className="text-sm font-medium">
                        Additional Notes
                      </label>
                      <textarea
                        id="notes"
                        className="w-full p-2 border rounded-md min-h-[100px]"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Please share any specific requirements or questions you have for the consultation"
                      />
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <Button variant="outline" className="w-full" onClick={() => setStep("time")}>
                      Go Back
                    </Button>
                    <Button type="submit" className="w-full">
                      Complete Booking
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}