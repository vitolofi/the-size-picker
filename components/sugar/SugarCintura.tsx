import { useEffect, useState } from "react"
export default function SugarCinturaSVG(props:{cinturaColor:string, description:string}) {



    return (<div className='relative'><div className="absolute top-10 left-6 z-10">
    <svg className='relative top-60 left-6' width="93" height="25" viewBox="0 0 273 25" fill="none" xmlns="http://www.w3.org/2000/svg"  >
<path className={`stroke${props.cinturaColor} shadow-lg outline-1 opacity-25`} d="M1 14L59 20H129L210.198 15.0904C227.703 14.0319 245.092 11.5362 262.188 7.62847L271.5 5.5" strokeWidth="10"/>
</svg>
<svg className='relative top-52 left-6' width="93" height="25" viewBox="0 0 273 25" fill="none" xmlns="http://www.w3.org/2000/svg" >
<path className={`stroke${props.cinturaColor} shadow-lg outline-1`} d="M1 14L59 20H129L210.198 15.0904C227.703 14.0319 245.092 11.5362 262.188 7.62847L271.5 5.5" strokeWidth="10"/>
</svg>
<svg className='relative top-44 left-6' width="93" height="25" viewBox="0 0 273 25" fill="none" xmlns="http://www.w3.org/2000/svg" >
<path className={`stroke${props.cinturaColor} shadow-lg outline-1 opacity-25`} d="M1 14L59 20H129L210.198 15.0904C227.703 14.0319 245.092 11.5362 262.188 7.62847L271.5 5.5" strokeWidth="10"/>
</svg>
        <div className={`relative inline-block p-1 top-[12.225rem] left-24 bg${props.cinturaColor} text-black`}>Cintura:{props.description}</div>
    </div>
    </div>)
}
