import React, { Component }  from "react";
// import "../PetWindow/Petwindow.css";
import {
    CircularProgressbar,
    // CircularProgressbarWithChildren,
    buildStyles
  } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';
import { Col, Row, Container } from "../Grid";
import Jumbotron from "../Jumbotron";
import happy from "../../images/sprites/phoebe-affection-happy.gif";
import meh from "../../images/sprites/phoebe-meh-4fps.gif";
import pissy from "../../images/sprites/phoebe-pissy.gif";
import sad from "../../images/sprites/phoebe-sad.gif";
import API from "../utils/API";


class PetWindow extends Component {
    state = {
        // should pull initial values from database, setting manually for now
        happiness: 12,
        energy: 8,
        imgSrc: happy,
        happinessPercent: 100
    };

    // sets appropriate image according to happiness level
    getAnimationState() {
        if (this.state.happiness > 9) {
            this.setState({ imgSrc: happy})
        } else if (this.state.happiness > 6) {
            this.setState({ imgSrc: meh})
        } else if (this.state.happiness > 3) {
            this.setState({imgSrc: pissy})
        } else {
            this.setState({imgSrc: sad})
        }
    };

    componentDidMount() {
        // this will likely need to have some kind of .then function - get current state from database, .then load database stat values accordingly. otherwise it will reflect default state set above and then switch.

        // get current happiness and energy stats from the database. 
        // this.loadStats();
        
        this.interval = setInterval(() => {
            this.setState({ happiness: this.state.happiness - 1});
            this.getAnimationState();
            this.setState({ happinessPercent: this.state.happiness * 100 / 12});
            // post new happiness stat to database
            console.log("Happiness has decreased to: " + this.state.happiness);
        }, 2000);
        
    };

    componentWillUnmount() {
        clearInterval(this.interval);
      }

      // load user's current energy and happiness stats from database. may need to pass user's id or something, also not sure about data passed in this.setState
    //   loadStats = () => {
    //       API.getStats()
    //       .then(res =>
    //         this.setState({ happiness: res.happiness, energy: res.energy })
    //         )
    //         .catch( err => console.log(err));
    //   };




    // will track when energy is earned and update energy stat in database. this will likely live on the todo component once configured
    incrementEnergy = () => {
        this.setState({ energy: this.state.energy + 4 });

        // post new energy stat to database
        // API.saveEnergy({ energy: this.state.energy})
        //     .then(res => this.loadStats())
        //     .catch(err => console.log(err));
    

        console.log("Energy has increased to: " + this.state.energy);
    };
    
    // will track consumption of energy and update energy stat in database. will likely live in todo copmonent
    decrementEnergy = () => {
        if (this.state.energy > 0) {
            this.setState({ energy: this.state.energy - 1 });

            // post new energy stat to database. unsure if passing correct data
            // API.saveEnergy({ energy: this.state.energy})
            //     .then(res => this.loadStats())
            //     .catch(err => console.log(err));

            console.log("Energy has decreased to: " + this.state.energy);
        } else {
            console.log("Energy is already fully depleted. Proof: " + this.state.energy)
        }
    };

    // will increase pet's happiness when user plays with it/pets it
    incrementHappiness = () => {
        if (this.state.happiness < 12) {
            this.setState({ happiness: this.state.happiness + 1 });

            // post new happiness stat to database. unsure if passing correct data
            // API.saveHappiness({ happiness: this.state.happiness })
            //     .then(res => this.loadStats())
            //     .catch(err => console.log(err));

            console.log("Happiness has increased to: " + this.state.happiness);
        } else {
            console.log("Pet's health is already full. Proof: " + this.state.happiness)
            // should maybe alert player that pet's happiness is full
        }

    };
    
    
    render() {
        return (
            <Container fluid>
                <Row>
                    <Col size="md-12">
                        <Jumbotron>
                            <h1>Happiness: {this.state.happiness}</h1>
                            <h1>Energy: {this.state.energy}</h1>
                        </Jumbotron>
                    </Col>
                    <Col size="md-12">
                        <img src={this.state.imgSrc} alt="Pet Gif" />
                    </Col>
                    <Col size="md-6">
                        <button className="btn btn-primary" onClick={this.incrementEnergy}>
                            Add 4 Energy
                        </button>
                    </Col>
                    <Col size="md-6">
                        <button className="btn btn-success"
                              onClick={() => {
                                this.decrementEnergy();
                                this.incrementHappiness();
                              }}>
                            Play/Pet
                        </button>
                    </Col>
                    <Col size="md-4">
                        <CircularProgressbar
                            value={this.state.happinessPercent}
                            minvalue={0}
                            maxvalue={12}
                            counterClockwise={true}
                            strokeWidth={50}
                            styles={buildStyles({
                            strokeLinecap: "butt"
                                })}
                        />
                    </Col>
                </Row>
            </Container>
        );
    }

}

export default PetWindow;