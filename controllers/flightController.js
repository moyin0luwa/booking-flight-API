const { v4:uuid } = require("uuid");
const fs = require("fs");
const flightsjson = require("../flights.json")

//to get all flightss
exports.getFlights = async (req, res) => {
    try{
        res.status(200).json({
            message: "ALL FLIGHTS BOOKED",
            flights: flightsjson})
    } catch (err) {
        res.status(500).json({message: err.message})
    }
}

//to get a single flight
exports.getFlight = async (req, res) => {
    try{
        let id = req.params.id
        const flight = flightsjson.find((flight) => flight.id === id)

        res.status(200 ).json({
            message: "Flight Found",
            flight
        })
    } catch (err) {
        res.status(500).json({message: err.message})
    }
}

//to book flights
exports.bookFlight = async (req,res) => {
    try{
        const {title, time, price, date} = await req.body;
        const newFlight = {
            id: uuid(),
            title,
            time,
            price,
            date
        }
        fs.readFile("flights.json", 'utf8', (err, content) => {
            if (err) throw err
            let data = JSON.parse(content)
            data.push(newFlight)
            fs.writeFile("flights.json", JSON.stringify(data), err => {
                if (err) throw err
                console.log("Done writing")
            });
        })

        res.status(201).json({
            message: "Flight has been BOOKED",
            newFlight
        })
    } catch (err) {
        res.status(500).json({message: err.message})
    }
}

//To update/edit Flight
exports.editFlight = async (req, res) => {
    try{
        let id = req.params.id
        const flight = flightsjson.find((flight) => flight.id === id)
        const {title, time, price, date} = await req.body;
        flight.title = title
        flight.time = time
        flight.price = price
        flight.date = date

        res.status(200 ).json({
            message: "Flight updated",
            flight
        })
    } catch (err) {
        res.status(500).json({message: err.message})
    }
}
 
//to delete flight
exports.deleteFlight = async (req, res) => {
    try{
        let id = req.params.id
        const flight = flightsjson.find((flight) => flight.id === id)
        flightsjson.splice(flightsjson.indexOf(flight), 1)
        res.status(200 ).json({
            message: "Flight deleted",
            flight
        })
    } catch (err) {
        res.status(500).json({message: err.message})
    }
}



