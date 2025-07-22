import {motion, useAnimation, useInView} from "framer-motion"
import { useEffect, useRef } from "react"

// Function Provider Component
export function Motion({children, index=1}){

    const ref = useRef(null)
    const isInView = useInView(ref, {once:false})

    const mainControls = useAnimation()

    useEffect(() => {
        if(isInView){
            mainControls.start('visible')
        }
    },[isInView])

    return(
        <div ref={ref} style={{position:'relative', overflow:'hidden'}}>
            <motion.div
                variants={{
                    hidden:{opacity:0, y:75},
                    visible:{opacity:1, y:0}
                }}
                initial='hidden'
                animate= {mainControls}
                transition={{ duration:0.5, delay: index * 0.25}}
            >
                {children}
            </motion.div>
        </div>
    )
}

export function HorMotion({children, index = 0}){

    const ref = useRef(null)
    const isInView = useInView(ref, {once:true})

    const mainControls = useAnimation()

    useEffect(() => {
        if(isInView){
            mainControls.start('visible')
        }
    },[isInView])

    return(
        <div ref={ref} style={{position:'relative', overflow:'hidden'}}>
            <motion.div
                variants={{
                    hidden:{opacity:0, x:100},
                    visible:{opacity:1, x:0}
                }}
                initial='hidden'
                animate= {mainControls}
                transition={{ 
                    duration:0.5, 
                    delay: index * 0.25,
                    ease:'easeInOut'
                }}
            >
                {children}
            </motion.div>
        </div>
    )
}