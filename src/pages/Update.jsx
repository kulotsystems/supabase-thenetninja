import { useParams, useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import supabase from '../config/supabaseClient.js';

const Update = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [title , setTitle ] = useState('');
    const [method, setMethod] = useState('');
    const [rating, setRating] = useState('');
    const [formError, setFormError] = useState(null);

    useEffect(() => {
        const fetchSmoothie = async () => {
            const { data, error } = await supabase
                .from('smoothies')
                .select()
                .eq('id', id)
                .single();

            if(error) {
                navigate('/', { replace: true });
            }

            if(data) {
                setTitle(data.title);
                setMethod(data.method);
                setRating(data.rating);
            }
        }

        fetchSmoothie().then(r => console.log('fetched...'));
    }, [id, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!title || !method || !rating) {
            setFormError({
                message: 'Please fill in all the fields correctly.'
            });
            return false;
        }

        const { data, error } = await supabase
            .from('smoothies')
            .update({ title, method, rating })
            .eq('id', id)
            .select()

        if(error) {
            setFormError(error);
        }

        if(data) {
            setFormError(null);
            navigate('/');
        }
    };


    return (
        <div className="page update">
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Title:</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <label htmlFor="method">Method:</label>
                <textarea
                    id="method"
                    value={method}
                    onChange={(e) => setMethod(e.target.value)}
                />

                <label htmlFor="rating">Rating:</label>
                <input
                    type="number"
                    id="rating"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                />

                <button>Update Smoothie Recipe</button>
                <button className="cancel" onClick={() => navigate('/')}>Cancel</button>

                {formError && (<p className="error">{formError.message}</p>)}
            </form>
        </div>
    );
};

export default Update;
