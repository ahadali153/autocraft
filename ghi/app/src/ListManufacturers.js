import React, { useState, useEffect } from 'react';

function ListManufacturers() {
    const [manufacturers, setManufacturers] = useState([]);
    const fetchData = async () => {
        const url = "http://localhost:8100/api/manufacturers/";
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            setManufacturers(data.manufacturers)
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <h1 style={{ fontSize: '2em', color: 'whitesmoke' }}>Manufacturers</h1>
            <div className="scrollable-div">
                <table className="table" style={{ color: 'whitesmoke' }}>
                    <thead>
                        <tr>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {manufacturers.map((manufacturer, index) => {
                            return (
                                <tr key={index}>
                                    <td>{manufacturer.name}</td>

                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ListManufacturers;
