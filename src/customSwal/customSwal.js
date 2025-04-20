import Swal from 'sweetalert2';

// Create a globally configured Swal instance with Tailwind fixes
const CustomSwal = Swal.mixin({
    scrollbarPadding: false,
    allowOutsideClick: true,
    backdrop: true,
    showConfirmButton: true, // Ensure the button is visible
    confirmButtonText: "OK", // Optional: Customize the text
    confirmButtonColor: "#3085d6", // Keeps the background overlay
    buttonsStyling: false, // Disable default styling to apply Tailwind classes
    customClass: {
        popup: "custom-swal-popup",
        title: "custom-swal-title",
        text:"custom-swal-text",
        confirmButton: "custom-swal-confirm",
        cancelButton: "custom-swal-cancel",
        actions: "swal2-actions", // Fixes button spacing issue
    },
});

export default CustomSwal;
