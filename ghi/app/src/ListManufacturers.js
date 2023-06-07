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
        <table className="table table-striped">
        <thead>
        <tr>
            <th style={{ fontSize: '2em' }}>Manufacturers</th>
        </tr>
        <tr>
            <th>Name</th>
        </tr>
        </thead>
        <tbody>
        {manufacturers.map((manufacturer, index) => {
        return (
        <tr key={index}>
            <td>{ manufacturer.name }</td>

        </tr>
        );
        })}
        </tbody>
        </table>
    );
    }

    export default ListManufacturers;
