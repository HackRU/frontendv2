'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/app/ui/button';
import { mlhSchools, countries as countryConstants } from '@/app/lib/constants';
import { submitInterestForm } from '@/app/lib/actions';

const InterestFormSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  age: z
    .number()
    .min(13, 'Must be at least 13 years old')
    .max(100, 'Please enter a valid age'),
  phoneNumber: z.string().min(10, 'Please enter a valid phone number'),
  email: z.string().email('Please enter a valid email address'),
  school: z.string().min(1, 'School is required'),
  levelOfStudy: z.string().min(1, 'Level of study is required'),
  countryOfResidence: z.string().min(1, 'Country of residence is required'),
  linkedInUrl: z.string().optional(),
  mlh_code_of_conduct: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the MLH Code of Conduct',
  }),
  mlh_privacy_policy: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the MLH Privacy Policy and Contest Terms',
  }),
  mlh_terms_and_conditions: z.boolean().optional(),
});

type InterestFormData = z.infer<typeof InterestFormSchema>;

export default function InterestForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  const schools = mlhSchools
    .split('\n')
    .filter((line) => line.trim() !== '')
    .map((line) => line.trim().replace(/['"]/g, ''));
  const countries = countryConstants
    .split('\n')
    .filter((line) => line.trim() !== '')
    .map((line) => line.trim().replace(/['"]/g, ''));

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InterestFormData>({
    resolver: zodResolver(InterestFormSchema),
  });

  const onSubmit = async (data: InterestFormData) => {
    setIsSubmitting(true);
    setSubmitMessage(null);
    try {
      await submitInterestForm(data);
      setSubmitMessage({
        type: 'success',
        text: 'Thank you for your interest! We will keep you updated on HackRU events.',
      });
      reset();
    } catch (error: any) {
      setSubmitMessage({ type: 'error', text: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl rounded-lg bg-gray-800 p-8 shadow-xl">
      <div className="mb-6 text-center">
        <h2 className="mb-2 text-3xl font-bold text-white">Stay Updated!</h2>
        <p className="text-gray-300">
          Sign up to be notified when registration opens for our next HackRU
          event.
        </p>
      </div>
      {submitMessage && (
        <div
          className={`mb-6 rounded-md p-4 ${submitMessage.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
        >
          {submitMessage.text}
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-white"
            >
              First Name *
            </label>
            <input
              {...register('firstName')}
              type="text"
              id="firstName"
              className="mt-1 block w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white placeholder-gray-400 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
              placeholder="Jane"
              autoComplete="given-name"
            />
            {errors.firstName && (
              <p className="mt-1 text-sm text-red-400">
                {errors.firstName.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-white"
            >
              Last Name *
            </label>
            <input
              {...register('lastName')}
              type="text"
              id="lastName"
              className="mt-1 block w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white placeholder-gray-400 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
              placeholder="Doe"
              autoComplete="family-name"
            />
            {errors.lastName && (
              <p className="mt-1 text-sm text-red-400">
                {errors.lastName.message}
              </p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-white"
            >
              Email Address *
            </label>
            <input
              {...register('email')}
              type="email"
              id="email"
              className="mt-1 block w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white placeholder-gray-400 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
              placeholder="jane.doe@example.com"
              autoComplete="email"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-400">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-medium text-white"
            >
              Phone Number *
            </label>
            <input
              {...register('phoneNumber')}
              type="tel"
              id="phoneNumber"
              className="mt-1 block w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white placeholder-gray-400 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
              placeholder="+1-555-123-4567"
              autoComplete="tel"
            />
            {errors.phoneNumber && (
              <p className="mt-1 text-sm text-red-400">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>
        </div>
        <div>
          <label htmlFor="age" className="block text-sm font-medium text-white">
            Age *
          </label>
          <select
            {...register('age', { valueAsNumber: true })}
            id="age"
            className="mt-1 block w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white placeholder-gray-400 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
            autoComplete="off"
          >
            <option value="">Select your age</option>

            {Array.from({ length: 13 }, (_, i) => i + 18).map((age) => (
              <option key={age} value={age}>
                {age}
              </option>
            ))}
          </select>
          {errors.age && (
            <p className="mt-1 text-sm text-red-400">{errors.age.message}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="school"
            className="block text-sm font-medium text-white"
          >
            School *
          </label>
          <select
            {...register('school')}
            id="school"
            className="mt-1 block w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
            autoComplete="organization"
          >
            <option value="">Select your school</option>
            {schools.map((school, index) => (
              <option key={index} value={school}>
                {school}
              </option>
            ))}
          </select>
          {errors.school && (
            <p className="mt-1 text-sm text-red-400">{errors.school.message}</p>
          )}
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label
              htmlFor="levelOfStudy"
              className="block text-sm font-medium text-white"
            >
              Level of Study *
            </label>
            <select
              {...register('levelOfStudy')}
              id="levelOfStudy"
              className="mt-1 block w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
              autoComplete="off"
            >
              <option value="">Select level of study</option>
              <option value="Less than Secondary / High School">
                Less than Secondary / High School
              </option>
              <option value="Secondary / High School">
                Secondary / High School
              </option>
              <option value="Undergraduate University (2 year - community college or similar)">
                Undergraduate University (2 year - community college or similar)
              </option>
              <option value="Undergraduate University (3+ year)">
                Undergraduate University (3+ year)
              </option>
              <option value="Graduate University (Masters, Professional, Doctoral, etc)">
                Graduate University (Masters, Professional, Doctoral, etc)
              </option>
              <option value="Code School / Bootcamp">
                Code School / Bootcamp
              </option>
              <option value="Other Vocational / Trade Program or Apprenticeship">
                Other Vocational / Trade Program or Apprenticeship
              </option>
              <option value="Post Doctorate">Post Doctorate</option>
              <option value="Other">Other</option>
              <option value="I'm not currently a student">
                I&apos;m not currently a student
              </option>
              <option value="Prefer not to answer">Prefer not to answer</option>
            </select>
            {errors.levelOfStudy && (
              <p className="mt-1 text-sm text-red-400">
                {errors.levelOfStudy.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="countryOfResidence"
              className="block text-sm font-medium text-white"
            >
              Country of Residence *
            </label>
            <select
              {...register('countryOfResidence')}
              id="countryOfResidence"
              className="mt-1 block w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
              autoComplete="country-name"
            >
              <option value="">Select your country</option>
              {countries.map((country, index) => (
                <option key={index} value={country}>
                  {country}
                </option>
              ))}
            </select>
            {errors.countryOfResidence && (
              <p className="mt-1 text-sm text-red-400">
                {errors.countryOfResidence.message}
              </p>
            )}
          </div>
        </div>
        <div>
          <label
            htmlFor="linkedInUrl"
            className="block text-sm font-medium text-white"
          >
            LinkedIn Profile (Optional)
          </label>
          <input
            {...register('linkedInUrl')}
            type="url"
            id="linkedInUrl"
            className="mt-1 block w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white placeholder-gray-400 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
            placeholder="https://linkedin.com/in/yourprofile"
            autoComplete="url"
          />
          {errors.linkedInUrl && (
            <p className="mt-1 text-sm text-red-400">
              {errors.linkedInUrl.message}
            </p>
          )}
        </div>
        <h3 className="text-lg font-semibold text-white">
          Required Agreements
        </h3>
        <div className="flex items-start space-x-3">
          <input
            {...register('mlh_code_of_conduct')}
            type="checkbox"
            id="mlh_code_of_conduct"
            className="mt-1 h-4 w-4 rounded border-gray-600 bg-gray-700 text-teal-500 focus:ring-teal-500"
          />
          <label htmlFor="mlh_code_of_conduct" className="text-sm text-white">
            I have read and agree to the MLH Code of Conduct (
            <a
              href="https://github.com/MLH/mlh-policies/blob/main/code-of-conduct.md"
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-400 hover:text-teal-300"
            >
              https://github.com/MLH/mlh-policies/blob/main/code-of-conduct.md
            </a>
            )*
          </label>
        </div>
        {errors.mlh_code_of_conduct && (
          <p className="mt-1 text-sm text-red-400">
            {errors.mlh_code_of_conduct.message}
          </p>
        )}
        <div className="flex items-start space-x-3">
          <input
            {...register('mlh_privacy_policy')}
            type="checkbox"
            id="mlh_privacy_policy"
            className="mt-1 h-4 w-4 rounded border-gray-600 bg-gray-700 text-teal-500 focus:ring-teal-500"
          />
          <label htmlFor="mlh_privacy_policy" className="text-sm text-white">
            I authorize you to share my application/registration information
            with Major League Hacking for event administration, ranking, and MLH
            administration in-line with the MLH Privacy Policy (
            <a
              href="https://github.com/MLH/mlh-policies/blob/main/privacy-policy.md"
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-400 hover:text-teal-300"
            >
              https://github.com/MLH/mlh-policies/blob/main/privacy-policy.md
            </a>
            ). I further agree to the terms of both the MLH Contest Terms and
            Conditions (
            <a
              href="https://github.com/MLH/mlh-policies/blob/main/contest-terms.md"
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-400 hover:text-teal-300"
            >
              https://github.com/MLH/mlh-policies/blob/main/contest-terms.md
            </a>
            ) and the MLH Privacy Policy (
            <a
              href="https://github.com/MLH/mlh-policies/blob/main/privacy-policy.md"
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-400 hover:text-teal-300"
            >
              https://github.com/MLH/mlh-policies/blob/main/privacy-policy.md
            </a>
            ). *
          </label>
        </div>
        {errors.mlh_privacy_policy && (
          <p className="mt-1 text-sm text-red-400">
            {errors.mlh_privacy_policy.message}
          </p>
        )}
        <div className="flex items-start space-x-3">
          <input
            {...register('mlh_terms_and_conditions')}
            type="checkbox"
            id="mlh_terms_and_conditions"
            className="mt-1 h-4 w-4 rounded border-gray-600 bg-gray-700 text-teal-500 focus:ring-teal-500"
          />
          <label
            htmlFor="mlh_terms_and_conditions"
            className="text-sm text-white"
          >
            I authorize MLH to send me occasional emails about relevant events,
            career opportunities, and community announcements.
          </label>
        </div>
        <div className="pt-4">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-full bg-teal-500 px-8 py-3 font-medium text-white shadow-lg transition duration-300 hover:bg-teal-400 hover:shadow-2xl disabled:opacity-50"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Interest Form'}
          </Button>
        </div>
      </form>
    </div>
  );
}
export type { InterestFormData };
