

export default function SugarBustoSVG(props:{bustoColor:string,}) {
    console.log(props.bustoColor,'bustocolor log')
    return (<div className="absolute top-3 left-1">
    <svg className='relative top-48 left-20' width="140" height="25" viewBox="0 0 273 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path className={`${props.bustoColor} shadow-lg outline-1 opacity-25`} d="M1 14L59 20H129L210.198 15.0904C227.703 14.0319 245.092 11.5362 262.188 7.62847L271.5 5.5" strokeWidth="10"/>
</svg>
<svg className='relative top-44 left-20' width="140" height="25" viewBox="0 0 273 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path className={`${props.bustoColor} shadow-lg outline-1`} d="M1 14L59 20H129L210.198 15.0904C227.703 14.0319 245.092 11.5362 262.188 7.62847L271.5 5.5" strokeWidth="10"/>
</svg>
<svg className='relative top-40 left-20' width="140" height="25" viewBox="0 0 273 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path className={`${props.bustoColor} shadow-lg outline-1 opacity-25`} d="M1 14L59 20H129L210.198 15.0904C227.703 14.0319 245.092 11.5362 262.188 7.62847L271.5 5.5" strokeWidth="10"/>
</svg>
    </div>)
}
