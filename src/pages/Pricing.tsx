
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Share2 } from "lucide-react";
import { toast } from "sonner";

const Pricing = () => {
  const [isYearly, setIsYearly] = useState(false);
  
  const plans = [
    {
      name: "Free",
      description: "For students who are just getting started",
      monthlyPrice: 0,
      yearlyPrice: 0,
      currency: "USD",
      features: [
        "5 notes per month",
        "Basic language support (English)",
        "Export to text format",
        "24-hour note storage"
      ],
      referralRequired: false,
      isPopular: false
    },
    {
      name: "Basic",
      description: "For regular students and professionals",
      monthlyPrice: 4.99,
      yearlyPrice: 49.99,
      currency: "USD",
      features: [
        "50 notes per month",
        "All languages support",
        "Export to Google Drive",
        "Convert to basic slides",
        "30-day note storage"
      ],
      referralRequired: false,
      isPopular: true
    },
    {
      name: "Pro",
      description: "For power users and educators",
      monthlyPrice: 9.99,
      yearlyPrice: 99.99,
      currency: "USD",
      features: [
        "Unlimited notes",
        "All languages support",
        "Export to all formats",
        "Advanced slides & essay conversion",
        "Unlimited storage",
        "Priority support"
      ],
      referralRequired: false,
      isPopular: false
    },
    {
      name: "Referral",
      description: "Earn with your network",
      monthlyPrice: 0,
      yearlyPrice: 0,
      currency: "USD",
      features: [
        "Basic plan features",
        "5 referrals needed for activation",
        "Renew monthly with new referrals",
        "Upgrade to paid plan anytime"
      ],
      referralRequired: true,
      isPopular: false
    }
  ];

  const handleSubscribe = (planName: string) => {
    // In real implementation, this would redirect to Stripe checkout
    toast.success(`Subscribed to ${planName} plan!`);
  };

  const handleReferral = () => {
    // In real implementation, this would generate a referral link
    navigator.clipboard.writeText("https://bicara-ai-scribe.com/ref/YOUR_ID");
    toast.success("Referral link copied to clipboard!");
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <section className="text-center space-y-4 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold">Choose Your Plan</h1>
        <p className="text-gray-600">
          Get premium features to enhance your note-taking experience or use our referral program to earn free access.
        </p>
        
        <div className="flex items-center justify-center space-x-4 mt-6">
          <span className={`text-sm font-medium ${!isYearly ? 'text-bicaraBlue-800' : 'text-gray-500'}`}>Monthly</span>
          <button
            type="button"
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isYearly ? 'bg-bicaraBlue-600' : 'bg-gray-300'}`}
            onClick={() => setIsYearly(!isYearly)}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isYearly ? 'translate-x-6' : 'translate-x-1'}`}
            />
          </button>
          <span className={`text-sm font-medium ${isYearly ? 'text-bicaraBlue-800' : 'text-gray-500'}`}>
            Yearly <span className="text-bicaraGreen-600 font-medium">Save 15%</span>
          </span>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {plans.map((plan, index) => (
          <Card 
            key={index} 
            className={`relative ${plan.isPopular ? 'border-bicaraBlue-400 shadow-lg' : 'border-gray-200'}`}
          >
            {plan.isPopular && (
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-bicaraBlue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                Most Popular
              </div>
            )}
            <CardHeader>
              <CardTitle className="text-xl">{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <span className="text-3xl font-bold">
                  {plan.currency}{isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                </span>
                {plan.monthlyPrice > 0 && (
                  <span className="text-sm text-gray-500">
                    /{isYearly ? 'year' : 'month'}
                  </span>
                )}
              </div>
              <ul className="space-y-2">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <Check size={16} className="text-bicaraGreen-500 mr-2 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              {plan.referralRequired ? (
                <Button className="w-full" variant="outline" onClick={handleReferral}>
                  <Share2 size={16} className="mr-2" />
                  Get Referral Link
                </Button>
              ) : (
                <Button 
                  className="w-full" 
                  variant={plan.isPopular ? "default" : "outline"}
                  onClick={() => handleSubscribe(plan.name)}
                >
                  {plan.monthlyPrice === 0 ? "Get Started" : "Subscribe"}
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </section>

      <section className="mt-16 bg-bicaraBlue-50 rounded-lg p-8 text-center max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Need a custom plan for your school or organization?</h2>
        <p className="text-gray-600 mb-6">
          We offer special pricing for educational institutions and large organizations.
          Contact us to discuss your requirements.
        </p>
        <Button size="lg">
          Contact Sales
        </Button>
      </section>
    </div>
  );
};

export default Pricing;
