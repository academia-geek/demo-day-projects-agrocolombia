import { render, screen, fireEvent } from '@testing-library/react';
import Register from '../Containers/Public/Register';


describe('Register', () => {
    test('renders without crashing', () => {
        render(<Register />);
        expect(screen.getByText('Registro')).toBeInTheDocument();
    });

    describe('email validation', () => {
        test('displays email error when email is invalid', () => {
            render(<Register />);
            const emailInput = screen.getByLabelText('Correo');
            fireEvent.change(emailInput, { target: { value: 'test.com' } });
            fireEvent.blur(emailInput);
            expect(screen.getByText('Ingrese un correo valido')).toBeInTheDocument();
        });

        test('displays no errors when email is valid', () => {
            render(<Register />);
            const emailInput = screen.getByLabelText('Correo');
            fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
            fireEvent.blur(emailInput);
            expect(screen.queryByText('Ingrese un correo valido')).toBeNull();
        });
    });

    describe('password validation', () => {
        test('displays password error when password is too short', () => {
            render(<Register />);
            const passwordInput = screen.getByLabelText('Contraseña');
            fireEvent.change(passwordInput, { target: { value: '1234567' } });
            fireEvent.blur(passwordInput);
            expect(screen.getByText('La contraseña debe tener al menos 8 caracteres')).toBeInTheDocument();
        });

        test('displays password error when password does not contain a number', () => {
            render(<Register />);
            const passwordInput = screen.getByLabelText('Contraseña');
            fireEvent.change(passwordInput, { target: { value: 'abcABC' } });
            fireEvent.blur(passwordInput);
            expect(screen.getByText('La contraseña debe tener al menos un número')).toBeInTheDocument();
        });

        test('displays password error when passwords do not match', () => {
            render(<Register />);
            const passwordInput = screen.getByLabelText('Contraseña');
            const passwordConfirmInput = screen.getByLabelText('Comfirma tu cotraseña');
            fireEvent.change(passwordInput, { target: { value: '12345678' } });
            fireEvent.change(passwordConfirmInput, { target: { value: '87654321' } });
            fireEvent.blur(passwordConfirmInput);
            expect(screen.getByText('Las contraseñas No coinciden')).toBeInTheDocument();
        });

        test('displays no errors when all fields are valid', () => {
            render(<Register />);
            const emailInput = screen.getByLabelText('Correo');
            fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
            fireEvent.blur(emailInput);
            const passwordInput = screen.getByLabelText('Contraseña');
            fireEvent.change(passwordInput, { target: { value: '12345678' } });
            fireEvent.blur(passwordInput);
            const passwordConfirmInput = screen.getByLabelText('Comfirma tu cotraseña');
            fireEvent.change(passwordConfirmInput, { target: { value: '12345678' } });
            fireEvent.blur(passwordConfirmInput);
            expect(screen.queryByText('Ingrese un correo valido')).toBeNull();
            expect(screen.queryByText('La contraseña debe tener al menos 8 caracteres')).toBeNull();
            expect(screen.queryByText('La contraseña debe tener al menos un número')).toBeNull();
            expect(screen.queryByText('Las contraseñas No coinciden')).toBeNull();
        });
    });
});