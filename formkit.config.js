import { generateClasses } from '@formkit/themes'

const config = {
    config: {
        classes: generateClasses({
            global: {
                message: 'bg-red-700 rounded text-white text-center p-2 text-sm font-bold uppercase mt-1',
                label: 'block text-lg text-white font-bold',
                input: 'w-full p-2 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400'
            },
            submit: {
                input: '$reset w-full bg-blue-500 hover:bg-blue-600 rounded p-2 text-white font-normal mt-5 transition-all'
            }
        })
    }
}

export default config