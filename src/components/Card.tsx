import Image from "next/image";
import React from "react";
import { ArrowRight } from "lucide-react";
import { SiBuymeacoffee } from "react-icons/si";
import { GiCoffeeBeans, GiCoffeeMug } from "react-icons/gi";

const FloatingImageContentBlock: React.FC = () => {
  // Helper component for menu items that alternates icons
  const MenuItem = ({ title, description, index }: { title: string; description: string; index: number }) => (
    <li className="flex items-start gap-3">
      {index % 2 === 0 ? (
        <GiCoffeeMug className="w-5 h-5 text-[#634232] mt-1 flex-shrink-0" />
      ) : (
        <GiCoffeeBeans className="w-5 h-5 text-[#634232] mt-1 flex-shrink-0" />
      )}
      <span className="text-[#38220f] text-md">
        <strong className="text-[#634232]  font-bold text-xl">{title}</strong>
        {' '}{description}
      </span>
    </li>
  );

  return (
    <section className="relative min-h-screen py-16 overflow-hidden">
      {/* Background with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed z-0"
        style={{
          backgroundImage: "url('/assets/cofee banner.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-[#38220f]/30" />
      </div>

      {/* Content Container */}
      <div className="container mx-auto px-4 relative">
        <div className="max-w-6xl mx-auto bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden">
          <div className="p-8 md:p-12">
            {/* Decorative Elements */}
            <div className="absolute md:top-6 md:right-12 top-14 right-7 text-[#F7E1BC]">
              <SiBuymeacoffee size={120} className="md:block hidden"/>
              <SiBuymeacoffee size={35} className="block md:hidden"/>
            </div>
            
            <div className="absolute md:top-6 md:left-16 top-9 left-7 text-[#634232]">
              <GiCoffeeMug size={120} className="md:block hidden" />
              <GiCoffeeMug size={35} className="block md:hidden" />
            </div>

            {/* Header Section */}
            <div className="relative z-10 mb-12 text-center">
              <h2 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#967259] to-[#38220f] mb-6 relative inline-block">
                Delicious Coffee
                <span className="absolute -top-8 -right-10 rotate-45">
                  <GiCoffeeBeans className="w-15 h-15 text-[#634832]" />
                </span>
              </h2>
              
              <p className="text-xl text-[#634232] max-w-3xl mx-auto leading-relaxed">
                Savor the rich symphony of taste and fragrance with our exquisite town-famous coffee.
                Indulge in the unparalleled harmony of flavor and aroma only found in our delightful coffee creations.
              </p>

              <button className="mt-8 group flex items-center gap-3 bg-[#967259] text-white py-3 px-8 rounded-full mx-auto
                transition-all duration-300 hover:bg-[#F7E1BC] hover:text-[#38220f] transform hover:scale-105 shadow-lg">
                Order Now
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
              </button>
            </div>

            {/* Menu Section */}
            <div className="mt-16">
              <h3 className="text-3xl font-bold text-[#634232] text-center mb-12 relative">
                Coming Soon: Our New Coffee Collection
                <div className="absolute w-24 h-1 bg-[#967259] bottom--4 left-1/2 transform -translate-x-1/2" />
              </h3>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-8">
                  <div className="bg-white/10 rounded-xl p-6 hover:bg-white/15 transition-all duration-300">
                    <h4 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#967259] to-[#38220f] mb-4">
                      Organic Selection
                    </h4>
                    <ul className="space-y-4">
                      {['Colombian', 'Donut Shop', 'Dark Mexican', 'Black Knight'].map((coffee, index) => (
                        <MenuItem 
                          key={coffee}
                          title={`Organic ${coffee} Coffee`}
                          description={getDescription(coffee)}
                          index={index}
                        />
                      ))}
                    </ul>
                  </div>

                  <div className="bg-white/10 rounded-xl p-6 hover:bg-white/15 transition-all duration-300">
                    <h4 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#967259] to-[#38220f] mb-4">
                      Specialty Flavors
                    </h4>
                    <ul className="space-y-4">
                      {['Mushroom', 'Banana', 'Salted Caramel', 'Coconut Almond', 'Blonde Chocolate', 'Toffee'].map((flavor, index) => (
                        <MenuItem 
                          key={flavor}
                          title={`${flavor} Coffee`}
                          description={getFlavorDescription(flavor)}
                          index={index}
                        />
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-8">
                  <div className="bg-white/10 rounded-xl p-6 hover:bg-white/15 transition-all duration-300">
                    <h4 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#967259] to-[#38220f] mb-4">
                      Specialty Espresso
                    </h4>
                    <ul className="space-y-4">
                      <MenuItem 
                        title="Cortado"
                        description="A Spanish-inspired drink with equal parts espresso and steamed milk."
                        index={0}
                      />
                      <MenuItem 
                        title="Brown Sugar Oatmilk Cortado"
                        description="A non-dairy delight with brown sugar and oat milk."
                        index={1}
                      />
                      <MenuItem 
                        title="Pistachio Latte"
                        description="Espresso and steamed milk infused with pistachio flavor and a brown-buttery topping."
                        index={2}
                      />
                    </ul>
                  </div>

                  <div className="relative">
                    <Image
                      src="/assets/banners/7.png"
                      alt="Coffee Banner"
                      width={500}
                      height={500}
                      className="w-full h-auto rounded-xl shadow-2xl transform transition-transform duration-500 hover:scale-105 hover:rotate-2"
                    />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-[#38220f]/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  <div className="bg-white/10 rounded-xl p-6 hover:bg-white/15 transition-all duration-300">
                    <h4 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#967259] to-[#38220f] mb-4">
                      Other Notable Launches
                    </h4>
                    <ul className="space-y-4 ">
                      <MenuItem 
                        title="Single-Origin Ethiopia"
                        description="A new coffee blend highlighting Ethiopian beans."
                        index={0}
                      />
                      <MenuItem 
                        title="Spicy Falafel Pocket"
                        description="A certified vegan snack option to pair with your coffee."
                        index={1}
                      />
                      <MenuItem 
                        title="Vanilla Bean Custard Danish"
                        description="A limited-time treat to complement your coffee experience."
                        index={2}
                      />
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Helper functions for descriptions
interface DescriptionMap {
  [key: string]: string;
}

const getDescription = (coffee: string): string => {
  const descriptions: DescriptionMap = {
    'Colombian': 'Enjoy the rich, smooth flavors of 100% organic Colombian beans.',
    'Donut Shop': 'Savor the delightful taste of this classic, now with organic ingredients.',
    'Dark Mexican': 'Experience the bold and robust flavors of organic dark Mexican coffee.',
    'Black Knight': 'Indulge in the deep, intense notes of this premium organic blend.'
  };
  return descriptions[coffee];
};

const getFlavorDescription = (flavor: string): string => {
  const descriptions: DescriptionMap = {
    'Mushroom': 'Discover various flavors of coffee infused with health-boosting mushrooms.',
    'Banana': 'Try the unique and refreshing blend of coffee with a hint of banana.',
    'Salted Caramel': 'Relish the sweet and savory fusion of salted caramel in your coffee.',
    'Coconut Almond': 'Enjoy the tropical taste of coconut and almond in every sip.',
    'Blonde Chocolate': 'Delight in the light and creamy flavor of blonde chocolate-infused coffee.',
    'Toffee': 'Treat yourself to the sweet, buttery goodness of toffee in your coffee.'
  };
  return descriptions[flavor];
};

export default FloatingImageContentBlock;