import * as React from "react"

import { cn } from "@/app/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> { 
    name:string,
    message:string,
    register:any,
    raffleData:any,
    setRaffleData:any,
    errors:string|undefined,
}

const Item = React.forwardRef<HTMLInputElement, InputProps>(
  ({ name, message, register, raffleData, setRaffleData, errors, className, type, ...props }, ref) => {
    return (
        <div className="w-full bg-gradient-to-b from-offblack-100 to-[#453148] p-20 rounded-xl">
          {(<p className="text-xs italic text-white mt-2">{message}</p>)}
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-white"
            >
              Amount
            </label>
            <div className="relative">
              <input
                {...register(name)}
                className="peer block w-96 rounded-md mb-4 border border-gray-200 py-[9px] pl-4 text-sm outline-2 placeholder:text-gray-500"
                placeholder="Enter your amount"
                value={raffleData[name]} 
                onChange={(e) => setRaffleData({ ...raffleData, [name]: e.target.value })}
                required
              />
              {errors && (<p className="text-xs italic text-red-500 mt-2">{errors}</p>)}
            </div>
          </div>
        </div>
    )
  }
)
Item.displayName = "Item"

export { Item }
