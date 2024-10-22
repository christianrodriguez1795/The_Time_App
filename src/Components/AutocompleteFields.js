import React from 'react';
import { Autocomplete, TextField } from '@mui/material';

const AutocompleteFields = ({
    comunidades,
    provinciasFiltradas,
    municipios,
    handleComunidadChange,
    handleProvinciaChange,
    handleMunicipioChange,    
}) => {
    return (

        <div className='flex flex-col justify-center gap-5 w-full'>
            <Autocomplete
                noOptionsText='No hay opciones'
                disablePortal
                options={comunidades}
                sx={{ width: '100%' }}
                onChange={handleComunidadChange}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label='Seleccione una comunidad autónoma'
                        variant='standard'
                        sx={{
                            '& .MuiInput-root': {
                                marginTop: 0,
                                borderRadius: '20px', // Ajusta el borde redondeado
                                '&:hover:not(.Mui-disabled):before': {
                                    borderBottom: '2px solid black', // Cambia el color del borde inferior al hacer hover
                                },
                                '&:after': {
                                    borderBottom: '2px solid #1976d2', // Cambia el color del borde inferior cuando está enfocado
                                },
                                minHeight: '56px', // Ajusta la altura del input
                            },
                            '& .MuiInputLabel-root': {
                                marginTop: '-4px', // Baja la posición del label
                                '&.Mui-focused': {
                                    color: '#1976d2', // Cambia el color del label cuando está enfocado
                                },
                            },
                        }}
                    />
                )}

                ListboxProps={{
                    className: 'autocomplete-scrollbar',

                }}
            />

            {provinciasFiltradas.length > 0 && (
                <Autocomplete
                    noOptionsText='No hay opciones'
                    disablePortal
                    options={provinciasFiltradas}
                    key={`${provinciasFiltradas.length}-${provinciasFiltradas[0]?.NOMBRE_PROVINCIA || 'default'}`}
                    getOptionLabel={(option) => option.NOMBRE_PROVINCIA}                    
                    sx={{ width: '100%' }}
                    onChange={handleProvinciaChange}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label='Seleccione una provincia'
                            variant='standard'
                            sx={{
                                '& .MuiInput-root': {
                                    marginTop: 0,
                                    borderRadius: '20px', // Ajusta el borde redondeado
                                    '&:hover:not(.Mui-disabled):before': {
                                        borderBottom: '2px solid black', // Cambia el color del borde inferior al hacer hover
                                    },
                                    '&:after': {
                                        borderBottom: '2px solid #1976d2', // Cambia el color del borde inferior cuando está enfocado
                                    },
                                    minHeight: '56px', // Ajusta la altura del input
                                },
                                '& .MuiInputLabel-root': {
                                    marginTop: '-4px', // Baja la posición del label
                                    '&.Mui-focused': {
                                        color: '#1976d2', // Cambia el color del label cuando está enfocado
                                    },
                                },
                            }}
                        />
                    )}
                    ListboxProps={{
                        className: 'autocomplete-scrollbar',

                    }}
                />
            )}

            {municipios.length > 0 && (
                <Autocomplete
                    noOptionsText='No hay opciones'
                    disablePortal
                    options={municipios}
                    key={`${municipios.length}-${municipios[0]?.NOMBRE || 'default'}`}
                    getOptionLabel={(option) => option.NOMBRE}
                    sx={{ width: '100%' }}
                    onChange={handleMunicipioChange}                   
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label='Seleccione un municipio'
                            variant='standard'
                            sx={{
                                '& .MuiInput-root': {
                                    marginTop: 0,
                                    borderRadius: '20px', // Ajusta el borde redondeado
                                    '&:hover:not(.Mui-disabled):before': {
                                        borderBottom: '2px solid black', // Cambia el color del borde inferior al hacer hover
                                    },
                                    '&:after': {
                                        borderBottom: '2px solid #1976d2', // Cambia el color del borde inferior cuando está enfocado
                                    },
                                    minHeight: '56px', // Ajusta la altura del input
                                },
                                '& .MuiInputLabel-root': {
                                    marginTop: '-4px', // Baja la posición del label
                                    '&.Mui-focused': {
                                        color: '#1976d2', // Cambia el color del label cuando está enfocado
                                    },
                                },
                            }}
                        />
                    )}

                    ListboxProps={{
                        className: 'autocomplete-scrollbar',

                    }}
                />
            )}
        </div>
    )
};

export default AutocompleteFields;
