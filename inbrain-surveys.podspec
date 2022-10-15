require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name         = "inbrain-surveys"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.description  = <<-DESC
                  inbrain-surveys
                   DESC
  s.homepage     = "https://github.com/github_account/inbrain-surveys"
  s.license      = "MIT"
  # s.license    = { :type => "MIT", :file => "FILE_LICENSE" }
  s.authors      = { "Your Name" => "yourname@email.com" }
  s.platforms    = { :ios => "12.0" }
  s.source       = { :git => "https://github.com/github_account/inbrain-surveys.git", :tag => "#{s.version}" }

  s.source_files = "ios/*.{h,m,swift}"
  s.requires_arc = true
  s.dependency "React"

  s.dependency 'InBrainSurveys', '1.8.7'
  
  # Require for now for XCode 12. 
  # See https://stackoverflow.com/questions/63607158/xcode-12-building-for-ios-simulator-but-linking-in-object-file-built-for-ios for details
  s.pod_target_xcconfig = { 'EXCLUDED_ARCHS[sdk=iphonesimulator*]' => 'arm64' }

  # ENHANCE when the new version is deployed as a pod, try this
  # s.vendored_frameworks = "ios/Frameworks/InBrainSurveys_SDK_Swift.xcframework"
   #s.preserve_path = "ios/Frameworks/*"

end
