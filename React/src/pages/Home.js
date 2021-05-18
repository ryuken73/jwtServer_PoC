import React from 'react'

function Home(props) {
    console.log('Home re-render: ', props);

    return (
        <div>
            Home Page
        </div>
    )
}

export default React.memo(Home)