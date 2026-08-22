import { Suspense } from 'react'
import AuthLoginForm from './AuthLoginForm'

export default function UserTrainerLoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex flex-col font-sans bg-[#F8F9FC]">
        <div className="flex-1 w-full max-w-[1440px] mx-auto flex flex-col lg:flex-row relative">
          <div className="hidden lg:flex w-full lg:w-1/2 flex-col pt-10 px-8 sm:px-14 lg:px-24 relative z-10">
            <div className="flex items-center gap-2 mb-16">
              <div className="w-7 h-7 bg-[#5A5FE0] rounded animate-pulse" />
              <div className="w-24 h-8 bg-[#5A5FE0] rounded animate-pulse" />
            </div>
            <div className="flex-1 flex flex-col max-w-[500px]">
              <div className="w-48 h-6 bg-gray-200 rounded animate-pulse mb-6" />
              <div className="w-4/5 h-10 bg-gray-200 rounded animate-pulse mb-3" />
              <div className="w-3/4 h-10 bg-gray-200 rounded animate-pulse mb-3" />
              <div className="w-full h-6 bg-gray-200 rounded animate-pulse mb-3" />
              <div className="w-full h-6 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
          <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-6 lg:p-12 relative z-10 min-h-screen lg:min-h-0">
            <div className="w-full max-w-[480px] bg-white rounded-3xl shadow-[0_12px_40px_rgb(0,0,0,0.06)] p-8 sm:p-12">
              <div className="w-32 h-8 bg-gray-200 rounded animate-pulse mx-auto mb-8" />
              <div className="w-24 h-4 bg-gray-200 rounded animate-pulse mx-auto mb-6" />
              <div className="w-full h-12 bg-gray-200 rounded animate-pulse mb-6" />
              <div className="w-full h-12 bg-gray-200 rounded animate-pulse mb-4" />
              <div className="w-full h-12 bg-gray-200 rounded animate-pulse mb-4" />
              <div className="w-full h-12 bg-gray-200 rounded animate-pulse mb-8" />
              <div className="w-full h-12 bg-gray-200 rounded animate-pulse mb-6" />
              <div className="flex items-center gap-3 my-6">
                <div className="flex-1 h-[1px] bg-gray-100" />
                <div className="w-24 h-4 bg-gray-200 rounded animate-pulse" />
                <div className="flex-1 h-[1px] bg-gray-100" />
              </div>
              <div className="flex flex-col gap-3">
                <div className="w-full h-12 bg-gray-200 rounded animate-pulse" />
                <div className="w-full h-12 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    }>
      <AuthLoginForm />
    </Suspense>
  )
}