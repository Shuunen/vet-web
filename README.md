# Medical Interface for Lovable Furballs

> Medical webapp for veterinarians

![logo](./docs/logo.svg)

## Goal

The goal of this project is to provide veterinarians with a comprehensive web application to streamline the management of their practice. The platform will allow them to:

- **Manage patient records**: Store and update medical histories, treatments, and vaccination schedules.
- **Schedule and track appointments**: Set up consultations, send reminders, and prevent scheduling conflicts.
- **Facilitate communication**: Provide a secure messaging system for veterinarians to communicate with pet owners.
- **Generate reports and prescriptions**: Easily create and store medical documents.
- **Improve workflow efficiency**: Reduce paperwork and administrative overhead with an intuitive interface.

This webapp aims to enhance the daily operations of veterinary clinics, making patient care more efficient and organized.

## Todo

- [ ] TanStack routing, branching in forms, xstate ?
- [ ] Test grpc-web
- [ ] Compare Zustand with other state management libraries
- [ ] Performance monitoring (lighthouse)

## Structure

src/
├── components/            # UI Components (Atomic Design)
│   ├── atoms/             # Smallest reusable components (Button, Input, Label)
│   ├── molecules/         # Grouped atoms forming functional components
│   ├── organisms/         # Complex UI structures combining molecules
│
├── utils/                 # Business logic and utilities
│   ├── foobar.const.ts    # Foobar related constants
│   ├── foobar.store.ts    # Foobar related Zustand store
│   ├── foobar.utils.ts    # Foobar related utility functions
│   ├── foobar.types.ts    # Foobar related TypeScript types
│
├── pages/                 # Page components (LoginPage, DashboardPage)
│        ├── App.tsx       # Main app entry point
│
├── routes/                # TanStack app routing
│   ├── __root.tsx.tsx     # Root route
│   ├── index.tsx          # Home page
│   ├── about.tsx          # About page
│
├── .gitignore
├── package.json
├── README.md              # This file :p

## Examples

### Home page

```tsx
// src/routes/index.tsx
import { Button } from '@/components/atoms/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/atoms/card'
import { createFileRoute } from '@tanstack/react-router'
import { Calendar, Clock, PawPrint } from 'lucide-react'

function Index() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex flex-col items-center justify-center mb-12">
        <h1 className="text-4xl font-bold text-center text-blue-800">Medical Interface for Lovable Furballs</h1>
        <p className="mt-4 text-xl text-gray-600 text-center max-w-2xl">Providing the best care for your furry friends with our dedicated veterinary services</p>
      </div>

      <div className="flex justify-center">
        <Card>
          <CardHeader>
            <CardTitle>
              <Calendar className="mr-2 h-6 w-6" />
              Book an Appointment
            </CardTitle>
            <CardDescription>Schedule a visit with our veterinary specialists</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start">
                <Clock className="h-5 w-5 text-blue-500 mr-3 mt-0.5" />
                <div>
                  <h3 className="font-medium">Quick and Easy Scheduling</h3>
                  <p className="text-gray-600">Book appointments in just a few clicks</p>
                </div>
              </div>
              <div className="flex items-start">
                <PawPrint className="h-5 w-5 text-blue-500 mr-3 mt-0.5" />
                <div>
                  <h3 className="font-medium">Specialized Care</h3>
                  <p className="text-gray-600">Our veterinarians are experts in pet healthcare</p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center pb-6 pt-2">
            <Button>Book Now</Button>
          </CardFooter>
        </Card>
      </div>

      <div className="mt-16 text-center text-gray-500">
        <p>Need assistance? Contact our clinic at (555) 123-4567</p>
      </div>
    </div>
  )
}

export const Route = createFileRoute('/')({
  component: Index,
})
```

### Root route

```tsx
// src/routes/__root.tsx
import { Header } from '@/components/molecules/header'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

export const Route = createRootRoute({
  component: () => (
    <div className="flex flex-col gap-4">
      <Header />
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </div>
  ),
})
```

### Form contact

```tsx
// src/components/molecules/form-contact.tsx
'use client'

import { Button } from '@/components/atoms/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/atoms/form'
import { Textarea } from '@/components/atoms/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Input } from '../atoms/input'

const minChars = 3

const contactFormSchema = z.object({
  message: z.string().min(minChars),
  other: z
    .object({
      primary: z.string(),
      secondary: z.string(),
    })
    .optional(),
  user: z.object({
    firstName: z.string().min(minChars),
    lastName: z.string().min(minChars),
  }),
})

type ContactForm = z.infer<typeof contactFormSchema>

// eslint-disable-next-line max-lines-per-function
export function FormContact() {
  const form = useForm<ContactForm>({
    defaultValues: {
      user: {
        firstName: '',
        lastName: '',
      },
    },
    resolver: zodResolver(contactFormSchema),
  })

  function onSubmit(values: ContactForm) {
    // eslint-disable-next-line no-console
    console.log(values)
  }

  return (
    <Form {...form}>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="user.firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First name(s)</FormLabel>
              <FormControl>
                <Input {...field} data-testid={field.name} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="user.lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last name</FormLabel>
              <FormControl>
                <Input {...field} data-testid={field.name} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea data-testid={field.name} placeholder="Type your message here." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={!form.formState.isValid} type="submit">
          Submit
        </Button>
      </form>
    </Form>
  )
}
```

## Links

- [knip](https://knip.dev/) : the code quality tool
- [lucid icons](https://lucide.dev/icons/) : the icons
- [react-app-structure](https://github.com/Shpendrr/react-app-structure) : the structure template
- [shadcn/ui](https://ui.shadcn.com/) : the UI components
- [vite](https://vitejs.dev/) : the bundler
- [sources](https://github.com/Shuunen/react-playground) : the sources of this project

## Req

- supported browsers with last n versions
