import supabase from '../config/supabaseClient.js';
import { useEffect, useState } from 'react';

// components
import SmoothieCard from '../components/SmoothieCard.jsx';

const Home = () => {
    const [fetchError, setFetchError] = useState(null);
    const [smoothies, setSmoothies]   = useState(null);

    useEffect(() => {
        const fetchSmoothies = async () => {
            const { data, error } = await supabase
                .from('smoothies')
                .select();

            if(error) {
                setFetchError(error);
                setSmoothies(null);
                console.log(error);
            }

            if(data) {
                setSmoothies(data);
                setFetchError(null);
            }
        };

        fetchSmoothies().then(() => console.log('fetched...'));
    }, []);

    return (
        <div className="page home">
            {fetchError && (
                <div>
                    <h3> Error {fetchError.code}</h3>
                    <p>{fetchError.message}</p>
                </div>
            )}

            {smoothies && (

                /* order by buttons */

                <div className="smoothie-grid">
                    {smoothies.map((smoothie) => (
                        <SmoothieCard key={smoothie.id} smoothie={smoothie}/>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Home;
