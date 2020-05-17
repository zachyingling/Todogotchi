import React, { Component }  from "react";
// import "../PetWindow/Petwindow.css";
import {
    CircularProgressbar,
    CircularProgressbarWithChildren,
    buildStyles
  } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';
import { Col, Row, Container } from "../Grid";
import Jumbotron from "../Jumbotron";
import happy from "../../images/sprites/phoebe-affection-happy.gif";
import meh from "../../images/sprites/phoebe-meh-4fps.gif";
import pissy from "../../images/sprites/phoebe-pissy.gif";


class PetWindow extends Component {
    state = {
        // should pull initial values from database, setting manually for now
        happiness: 12,
        energy: 8,
        imgSrc: happy,
        happinessPercent: 100
    };

    // sets correct image according to happiness level
    getAnimationState() {
        if (this.state.happiness > 8) {
            this.setState({ imgSrc: happy})
        } else if (this.state.happiness > 4) {
            this.setState({ imgSrc: meh})
        } else {
            this.setState({imgSrc: pissy})
        }
    };

    componentDidMount() {
        // this will likely need to have some kind of .then function - get current state from database, .then load database stat values accordingly. otherwise it will reflect default state set above and then switch.
        
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

    // will track when energy is earned
    incrementEnergy = () => {
        this.setState({ energy: this.state.energy + 4 });
        // post new energy stat to database
        console.log("Energy has increased to: " + this.state.energy);
    };
    
    // will track consumption of energy
    decrementEnergy = () => {
        this.setState({ energy: this.state.energy - 1 });
        // post new energy stat to database
        console.log("Energy has decreased to: " + this.state.energy);
    }

    // will increase pet's happiness when user plays with it/pets it
    incrementHappiness = () => {
        this.setState({ happiness: this.state.happiness + 1 });
        // post new happiness stat to database
        console.log("Happiness has increased to: " + this.state.happiness);
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