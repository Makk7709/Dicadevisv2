import logoImage from 'figma:asset/c2fcff3a263a9d3aa6ec0eef1caabf51bd06c224.png';

export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center ${className}`}>
      <img 
        src={logoImage} 
        alt="DICA - Stratifié et Compact HPL" 
        className="h-8 sm:h-10 w-auto"
      />
    </div>
  );
}