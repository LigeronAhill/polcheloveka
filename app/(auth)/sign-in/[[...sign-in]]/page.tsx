import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className='flex justify-center items-center mx-auto mt-6 dark-gradient'>
    <SignIn appearance={
    {
      elements: {
        formButtonPrimary: "dark-gradient",
        footerActionLink: "primary-text-gradient hover:text-primary-500",
      }
    }
  } />
  </div>
  )
}
