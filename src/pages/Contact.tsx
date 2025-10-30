import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Building2, 
  User,
  MailIcon,
  MessageSquare
} from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    console.log("Form submitted:", formData);
    alert("Thank you for your message! We'll get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Quad Plus Architects",
      details: "Pillaiyarpatti, Thanjavur District, Tamil Nadu 613403"
    },
    {
      icon: Phone,
      title: "Call Us",
      details: "+91 97871-55330"
    },
    {
      icon: Mail,
      title: "Email Us",
      details: "architectsquadplus@gmail.com"
    },
    {
      icon: Clock,
      title: "Working Hours",
      details: "Monday - Friday: 9AM - 6PM"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-pink-500/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-red-500 hover:bg-red-600">Contact Us</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Let's <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-pink-500">Build Together</span>
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
              Have a project in mind? Get in touch with our team of expert architects 
              and let's turn your vision into reality.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl">Send us a message</CardTitle>
                <CardDescription>
                  Fill out the form below and our team will get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Vignesh Nehru"
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <div className="relative">
                        <MailIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Vigneshnehru@quadplus.com"
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Project inquiry"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us about your project..."
                        className="pl-10 min-h-[150px]"
                        required
                      />
                    </div>
                  </div>
                  <Button type="submit" size="lg" className="w-full bg-red-500 hover:bg-red-600 py-6">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div>
              <div className="mb-12">
                <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
                <p className="text-gray-600 mb-8">
                  Our team is ready to assist you with all your architectural needs. 
                  Reach out to us through any of the channels below.
                </p>
                
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-start">
                      <div className="bg-red-100 p-3 rounded-full mr-4">
                        <info.icon className="text-red-500 w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1">{info.title}</h3>
                        <p className="text-gray-600">{info.details}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Office Location */}
              <Card className="border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="mr-2 text-red-500" />
                    Our Location
                  </CardTitle>
                </CardHeader>
                <CardContent>
  <iframe
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3910.234456789123!2d79.07737261523043!3d10.73628252589173!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baabff7bc2ef745%3A0xd221618d66fa63f8!2sQuad%20Plus%20Architects!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
  width="100%"
  height="300"
  style={{ border: 0 }}
  allowFullScreen
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
  className="rounded-lg"
/>

                  <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500">Interactive Map</p>
                      <p className="text-sm text-gray-400 mt-1">Near Kamarajar Statue, pillaiyarpatti,Thanjavur District</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-500 to-pink-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Project?</h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto">
            Schedule a free consultation with our design experts today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-red-500 hover:bg-gray-100 px-8 py-6 text-lg">
              Book Free Consultation
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 px-8 py-6 text-lg">
              Call Us Now
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;