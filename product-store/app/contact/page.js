'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, Phone, MapPin } from 'lucide-react';
import notifications from "@/components/alerts/alerts.js";
import Button from "@/components/Button";
import InputField from "@/components/Input";

// Zod schema
const contactSchema = z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().email('Invalid email address'),
    phone: z.string()
        .min(1, 'Phone number is required')
        .regex(/^\d{10}$/, 'Invalid Phone Number'),
    message: z.string().min(1, 'Message is required')
});

export default function ContactForm() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            message: ''
        }
    });

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const result = await res.json();

            if (res.ok) {
                notifications.success(result.message);
                reset();
                router.push(`/`);
            } else {
                notifications.error(result.message);
            }
        } catch (error) {
            console.error('Message sending error:', error);
            notifications.error('Message sending failed. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-4 md:p-8">
            <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden">
                {/* Left Info Section */}
                <div className="w-full md:w-2/5 bg-[var(--primaryColor)] text-white p-6 md:p-8">
                    <div className="h-full flex flex-col">
                        <div className="relative h-48 mb-6 rounded-lg overflow-hidden">
                            <img
                                src="/assests/contact.gif"
                                alt="Contact"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <h2 className="text-2xl font-semibold mb-6">Get In Touch</h2>

                        <div className="space-y-6 mt-2">
                            <div className="flex items-start">
                                <MapPin className="mr-4 mt-1 flex-shrink-0" />
                                <div>
                                    <h3 className="font-medium">Address</h3>
                                    <p className="text-sm mt-1">123 Business Avenue, Suite 100<br />San Francisco, CA 94107</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <Phone className="mr-4 mt-1 flex-shrink-0" />
                                <div>
                                    <h3 className="font-medium">Phone</h3>
                                    <p className="text-sm mt-1">(123) 456-7890</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <Mail className="mr-4 mt-1 flex-shrink-0" />
                                <div>
                                    <h3 className="font-medium">Email</h3>
                                    <p className="text-sm mt-1">info@yourcompany.com</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-auto pt-6">
                            <p className="text-sm">Business Hours: Mon-Fri 9AM-5PM PST</p>
                        </div>
                    </div>
                </div>

                {/* Right Form Section */}
                <div className="w-full md:w-3/5 p-6 md:p-8">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <h2 className="text-2xl font-semibold text-[var(--primaryColor)] mb-6 text-center">Send us a Message</h2>

                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1">
                                <InputField
                                    id="firstName"
                                    label="First Name"
                                    register={register}
                                    errors={errors}
                                />
                            </div>

                            <div className="flex-1">
                                <InputField
                                    id="lastName"
                                    label="Last Name"
                                    register={register}
                                    errors={errors}
                                />
                            </div>
                        </div>

                        <InputField
                            id="email"
                            label="Email"
                            type="email"
                            register={register}
                            errors={errors}
                        />

                        <InputField
                            id="phone"
                            label="Phone Number"
                            type="tel"
                            register={register}
                            errors={errors}
                        />

                        <InputField
                            id="message"
                            label="Message"
                            as="textarea"
                            rows={5}
                            register={register}
                            errors={errors}
                        />

                        <Button type="submit" loading={loading}>
                            Send
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}
