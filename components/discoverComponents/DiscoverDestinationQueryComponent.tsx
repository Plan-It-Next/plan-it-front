import React, { useState } from 'react';

interface DiscoverDestinationQueryProps {
    onSendQuery: (destination: string) => Promise<string>;
}

const DiscoverDestinationQueryComponent: React.FC<DiscoverDestinationQueryProps> = ({ onSendQuery }) => {
    const [query, setQuery] = useState('');
    const [result, setResult] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSendQuery = async () => {
        if (!query.trim()) return;

        setLoading(true);
        setResult(null);
        try {
            const response = await onSendQuery(query);
            setResult(response);
        } catch (error) {
            setResult('An error occurred while fetching the data.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-8 bg-gray-100 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">¿Dónde quieres viajar?</h2>
            <div className="flex flex-col gap-4">
                {/* Input and Button Section */}
                <div className="flex flex-row gap-4 items-center">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Introduce un destino..."
                        className="flex-grow px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        onClick={handleSendQuery}
                        className="px-6 py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition"
                        disabled={loading}
                    >
                        {loading ? 'Enviando...' : 'Enviar'}
                    </button>
                </div>

                {/* Result Section */}
                {result && (
                    <div className="mt-4 p-4 border rounded-lg bg-white">
                        <h3 className="text-lg font-semibold mb-2">Resultados:</h3>
                        <p>{result}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DiscoverDestinationQueryComponent;
