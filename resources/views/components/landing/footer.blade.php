<footer class="bg-gray-800 dark:bg-gray-900 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="col-span-1">
                <div class="flex items-center space-x-2 mb-4">
                    <div class="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                        <span class="text-white font-bold text-lg">CS</span>
                    </div>
                    <span class="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        CreateStellar
                    </span>
                </div>
                <p class="text-gray-400 text-sm">
                    Empowering content creators to share their knowledge and build thriving online businesses.
                </p>
            </div>
            <div class="col-span-1">
                <h3 class="text-lg font-semibold text-white mb-4">Product</h3>
                <ul class="space-y-2">
                    <li><a href="#features" class="text-gray-400 hover:text-white transition-colors">Features</a></li>
                    <li><a href="#pricing" class="text-gray-400 hover:text-white transition-colors">Pricing</a></li>
                    <li><a href="{{ route('courses.index') }}" class="text-gray-400 hover:text-white transition-colors">Courses</a></li>
                </ul>
            </div>
            <div class="col-span-1">
                <h3 class="text-lg font-semibold text-white mb-4">Support</h3>
                <ul class="space-y-2">
                    <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
                    <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Contact Us</a></li>
                    <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
                </ul>
            </div>
        </div>
        <div class="border-t border-gray-700 mt-8 pt-8 text-center text-gray-500 text-sm">
            &copy; {{ date('Y') }} CreateStellar. All rights reserved.
        </div>
    </div>
</footer>
