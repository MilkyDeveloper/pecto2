import React, { useContext, useState, useEffect } from 'react'
import { UserContext } from '@/lib/context'
import { StoreInstance as Store } from '@/lib/store'
import UserPacks from './Home/UserPacks'
import './Home.scss'

function Home() {
    const { user, loading } = useContext(UserContext)
    const [usersPacks, setUsersPacks] = useState([])

    useEffect(() => {
        async function setPacks () { setUsersPacks(await Store.getMyPacks()) }
        if (usersPacks.length == 0 && user?.displayName != null) setPacks()
    }, [loading])

    // try {
    //     user.displayName
    // } catch {
    //     return (
    //         <div className="container text-center">
    //             <div className="m-3">
    //                 Sign in for a personalized home-page
    //             </div>
    //         </div> 
    //     )
    // }
    return (
        <div className="container">
            <div className="m-3">
                <UserPacks canEdit packs={usersPacks} title="Your Packs"/>
            </div>
        </div>
    )
}

export default Home
