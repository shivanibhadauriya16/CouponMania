
export default function TitleComponent({title}) {
    return (
        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
            <div style={{display:'flex', flexDirection:'column'}}>
            <div style={{display:'flex', alignItems:'center'}}>
               <div style={{marginLeft:5, marginTop:5, marginRight:10 }}>
                   <img src="/2.png" style={{width:60}} />
               </div>
               <div style={{fontWeight:700 , fontSize:24}}>
                   CouponMania
               </div>
            </div>
            <div style={{fontWeight:500 , fontSize:16, marginLeft:5}}>
                {title}
            </div>
            </div>
            <div style={{margin:6 }}>
                   <img src="/4.png" style={{width:110}} />
               </div>
        </div>
    )
}