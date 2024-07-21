import { ReactNode } from "react"

function AuthLayout({children,title}:{children:ReactNode,title:string}) {
  return (
    <div className="h-screen bg-neutral-950 text-neutral-100 flex justify-center items-center">
        <div className="max-w-lg w-full  border border-neutral-700 bg-neutral-900 p-5 rounded-md text-sm font-semibold">
            <h2 className="font-semibold text-center text-2xl mb-5 capitalize text-neutral-50">{title}</h2>
            <div>
            {children}
            </div>
        
        </div>
      
    </div>
  )
}

export default AuthLayout
