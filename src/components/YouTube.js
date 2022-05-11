import React, { Component } from 'react'

export class Youtube extends Component {
    render() {
        return (
            <>
                <div style={{height : "13vh"}}></div>
                <div><iframe className='iframe' width="1080" height="720" frameBorder="0" 
                    // src="https://www.youtube.com/embed/Qah9sSIXJqk">
                    
                    src={`https://www.youtube.com/embed/${localStorage.getItem("ytlink")}?autoplay=1?controls=0`}>
                </iframe></div>
            </>
        )
    }
}

export default Youtube