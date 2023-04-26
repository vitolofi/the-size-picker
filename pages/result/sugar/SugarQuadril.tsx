import { useEffect } from "react"

export default function SugarQuadrilSVG(props:{quadrilColor:string}) {

    useEffect(()=>{

    },[props])

    return (<div className="absolute top-16 left-4">
    <svg className='relative top-60 left-16' width="107" height="25" viewBox="0 0 273 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path className='stroke-green-200 shadow-lg outline-1' d="M1 14L59 20H129L210.198 15.0904C227.703 14.0319 245.092 11.5362 262.188 7.62847L271.5 5.5" strokeWidth="10"/>
</svg>
<svg className='relative top-52 left-16' width="107" height="25" viewBox="0 0 273 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path className={`stroke-green-400 shadow-lg outline-1`} d="M1 14L59 20H129L210.198 15.0904C227.703 14.0319 245.092 11.5362 262.188 7.62847L271.5 5.5" strokeWidth="10"/>
</svg>
<svg className='relative top-44 left-16' width="107" height="25" viewBox="0 0 273 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path className='stroke-green-200 shadow-lg outline-1' d="M1 14L59 20H129L210.198 15.0904C227.703 14.0319 245.092 11.5362 262.188 7.62847L271.5 5.5" strokeWidth="10"/>
</svg>
    </div>)
}
