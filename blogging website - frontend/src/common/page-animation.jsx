import React from 'react'
import {motion,AnimatePresence} from 'framer-motion'

const AnimationWrapper = ({children,initial={opacity:0},animate={opacity:1},transition={duration:2},keyValue,className}) => {
  return (
    <AnimatePresence>
    <motion.div 
    key={keyValue}
    initial={initial}
    animate={animate}
    transition={transition}
    className={className}
    >{children}</motion.div>
    </AnimatePresence>
  )
}

export default AnimationWrapper