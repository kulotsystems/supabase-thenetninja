import supabase from '../config/supabaseClient.js';
import { useEffect, useState } from 'react';

// components
import SmoothieCard from '../components/SmoothieCard.jsx';

const Home = () => {
    const [fetchError, setFetchError] = useState(null);
    const [smoothies, setSmoothies]   = useState(null);
    const [orderBy, setOrderBy] = useState('created_at');

    const handleDelete = (id) => {
        setSmoothies(smoothies.filter(smoothie => smoothie.id !== id));
    };

    useEffect(() => {
        const fetchSmoothies = async () => {
            const { data, error } = await supabase
                .from('smoothies')
                .select()
                .order(orderBy, { ascending: false })

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
    }, [orderBy]);

    return (
        <div className="page home">
            {fetchError && (
                <div>
                    <h3> Error {fetchError.code}</h3>
                    <p>{fetchError.message}</p>
                </div>
            )}

            {smoothies && (
                <div className="smoothies">
                    <div className="order-by">
                        <p>Order by:</p>
                        <button onClick={() => setOrderBy('created_at')} className={orderBy === 'created_at' ? 'active' : ''}>
                            Time Created
                        </button>
                        <button onClick={() => setOrderBy('title')} className={orderBy === 'title' ? 'active' : ''}>
                            Title
                        </button>
                        <button onClick={() => setOrderBy('rating')} className={orderBy === 'rating' ? 'active' : ''}>
                            Rating
                        </button>
                    </div>
                    <div className="smoothie-grid">
                        {smoothies.map((smoothie) => (
                            <SmoothieCard key={smoothie.id} smoothie={smoothie} deleteSmoothie={handleDelete}/>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
