import React from 'react'
import CTAButton from './CTAButton'
import { FaArrowRight } from 'react-icons/fa'
import {TypeAnimation} from 'react-type-animation'
function CodeBlocks({position,heading,  subheading, ctabtn1, ctabtn2, codeblock, backgroundGradient, codecolor}) {
  return (
    <div className={`flex ${position} my-20 justify-between gap-24`}>
         
         {/* Section 1 */}
         <div className='w-[50%] flex flex-col gap-8'>
                {heading}
                <div className='text-richblack-300 font-bold'>{subheading}</div>
                <div className='flex gap-7 mt-7'>
                    <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
                        <div className='flex gap-2 items-center'>
                            {ctabtn1.text}
                            <FaArrowRight></FaArrowRight>
                        </div>
                    </CTAButton>
                    <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
                        {ctabtn2.text}
                    </CTAButton>
                    
                </div>
         </div>

         {/* Section 2 */}
         <div className='w-[50%] flex h-fit py-4 border rounded-md shadow-lg shadow-blue-600'>
            <div className='text-center flex-col w-[10%] text-richblack-400 font-inter font-bold'>
                <p>1</p>
                <p>2</p>
                <p>3</p>
                <p>4</p>
                <p>5</p>
                <p>6</p>
                <p>7</p>
                <p>8</p>
                <p>9</p>
                <p>10</p>
            </div>
            <div className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codecolor} pr-2`}>
                <TypeAnimation 
                    sequence={[codeblock, 5000, ""]}
                    repeat={Infinity}
                    cursor
                    omitDeletionAnimation
                    style={
                        {
                            whiteSpace: "pre-line",
                            display: "block",
                            
                        }
                    }
                />
            </div>
         </div>
    </div>
  )
}

export default CodeBlocks
