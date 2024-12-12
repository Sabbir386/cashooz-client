import Swal from 'sweetalert2';

// Create a globally configured Swal instance
const CustomSwal = Swal.mixin({
    scrollbarPadding: false,
    allowOutsideClick: true,
    backdrop: true,
    showConfirmButton: true,    // Ensure the button is visible
    confirmButtonText: "OK",    // Optional: Customize the text
    confirmButtonColor: "#3085d6",      // Keeps the background overlay
});

export default CustomSwal;
