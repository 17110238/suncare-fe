import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'
import { Button, Modal, ModalHeader, ModalFooter, ModalBody, Form, Label, Input, FormGroup, Row, Col } from 'reactstrap'
import { emitter } from '../../utils/emitter'

class ModalUser extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            firstName: '',
            lastName: '',
            address: '',
            password: '',
            confirmPassword: '',
            errors: {},
        }
        this.listenToEmitter()
    }

    componentDidMount() {
    }

    showModal() {
        this.setState({
            isModalOpen: true
        });
    }

    listenToEmitter() {
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
            this.setState({
                email: '',
                firstName: '',
                lastName: '',
                address: '',
                password: '',
                confirmPassword: '',
                errors: {},
            })
        })
    }

    toggle() {
        this.props.toggleFromParent()
    }

    // good code
    handleOnChangeInput(e, id) {
        let copyState = { ...this.state }
        copyState[id] = e.target.value
        this.setState({ ...copyState })
    }

    handleAddNewUser() {
        if (this.validate()) {
            this.props.createNewUser(this.state)
        }
        else {
            console.log('validate Not success!')
        }
    }

    handleInput(e) {
        const target = e.target;
        const name = target.name;

        this.setState({
            [name]: e.target.value,
        })
    }

    resetModalData = () => {
        this.setState({
            email: '',
            firstName: '',
            lastName: '',
            address: '',
            password: '',
            confirmPassword: '',
            errors: {},
        })
    }

    validate = () => {
        const { email, password, confirmPassword, firstName, lastName, address } = this.state
        const errors = {}

        function validateEmail(email) {
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        }

        if (email === '') {
            errors.email = "Required"
        }

        else if (!validateEmail(email)) {
            errors.email = "Not an email adress"
        }

        function validatePassWord(password) {
            const reg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&^_-]{8,}$/
            return reg.test(password)
        }

        if (password === '') {
            errors.password = "Required"
        }
        else if (!validatePassWord(password)) {
            errors.password = "Password must be at least 8 characters with at least 1 number and 1 special character"
        }

        if (firstName === '') {
            errors.firstName = "Required"
        }
        if (lastName === '') {
            errors.lastName = "Required"
        }
        if (address === '') {
            errors.address = "Required"
        }

        if (confirmPassword === '') {
            errors.confirmPassword = "Required"
        } else if (confirmPassword !== password) {
            errors.confirmPassword = "Does not match"
        }
        this.setState({ errors: errors })
        if (Object.keys(errors).length > 0) return false
        return true
    }

    render() {
        // const errors = this.validate(this.state.email, this.state.password, this.state.confirmPassword, this.state.firstName, this.state.lastName, this.state.address)
        return (
            <div>
                <Modal isOpen={this.props.isOpen} toggle={() => this.toggle()} style={{ maxWidth: '60%' }} >
                    <ModalHeader toggle={() => this.toggle()} className="text-2xl">
                        Create A New User
                    </ModalHeader>
                    <ModalBody>
                        <Form className="create-user-form">
                            <Row form>
                                <Row className="mb-4">
                                    <Col xs={6}>
                                        <FormGroup>
                                            <Label for="exampleEmail">
                                                Email:
                                            </Label>
                                            <Input
                                                id="exampleEmail"
                                                name="email"
                                                placeholder="ngoctien@gmail.com"
                                                type="email"
                                                // invalid={this.state.errors.email === ''}
                                                // valid={this.state.errors.email !== ''}
                                                onChange={(e) => this.handleInput(e, 'email')}
                                                value={this.state.email}

                                            />
                                            <p className="text-red-600">{this.state.errors.email}</p>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row className="mb-4">
                                    <Col xs={6}>
                                        <FormGroup>
                                            <Label for="examplePassword">
                                                Password:
                                            </Label>
                                            <Input
                                                id="examplePassword"
                                                name="password"
                                                placeholder="***********"
                                                type="password"
                                                value={this.state.password}
                                                onChange={(e) => this.handleInput(e, 'password')}

                                            />
                                            <p className="text-red-600">{this.state.errors.password}</p>
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="exampleConfirmPassword">
                                                Confirm Password:
                                            </Label>
                                            <Input
                                                id="exampleConfirmPassword"
                                                name="confirmPassword"
                                                placeholder="***********"
                                                type="password"
                                                value={this.state.confirmPassword}
                                                onChange={(e) => this.handleInput(e, 'confirmPassword')}

                                            />
                                            <p className="text-red-600">{this.state.errors.confirmPassword}</p>
                                        </FormGroup>
                                    </Col>
                                </Row>

                                <Row className="mb-4">
                                    <Col xs={6}>
                                        <FormGroup>
                                            <Label for="exampleFirstName">
                                                First Name:
                                            </Label>
                                            <Input
                                                id="exampleFirstName"
                                                name="firstName"
                                                placeholder="First Name"
                                                value={this.state.firstName}
                                                onChange={(e) => this.handleInput(e, 'firstName')}
                                            />
                                            <p className="text-red-600">{this.state.errors.firstName}</p>
                                        </FormGroup>
                                    </Col>
                                    <Col xs={6}>
                                        <FormGroup>
                                            <Label for="exampleLastName">
                                                Last Name:
                                            </Label>
                                            <Input
                                                id="exampleLastName"
                                                name="lastName"
                                                placeholder="Last Name"
                                                value={this.state.lastName}
                                                onChange={(e) => this.handleInput(e, 'lastName')}
                                            />
                                            <p className="text-red-600">{this.state.errors.lastName}</p>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row form>
                                    <Col md={12}>
                                        <FormGroup>
                                            <Label for="exampleAddress">
                                                Address:
                                            </Label>
                                            <Input
                                                id="exampleAddress"
                                                name="address"
                                                placeholder="12/2 duong so 16, Linh Trung, Thu Duc"
                                                value={this.state.address}
                                                onChange={(e) => this.handleInput(e, 'address')}
                                            />
                                            <p className="text-red-600">{this.state.errors.address}</p>

                                        </FormGroup>
                                    </Col>
                                </Row>
                            </Row>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            color="primary"
                            onClick={() => this.handleAddNewUser()}
                        >
                            Add New
                        </Button>

                        <Button onClick={() => this.toggle()}>
                            Close
                        </Button>
                    </ModalFooter>
                </Modal>
            </div >
        )
    }
}

const mapStateToProps = state => {
    return {
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ModalUser)
