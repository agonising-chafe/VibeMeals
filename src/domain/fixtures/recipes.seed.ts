/**
 * src/domain/fixtures/recipes.seed.ts
 * 
 * Production-ready MVP recipe catalog
 * 16 curated recipes covering all time bands, personas, and dietary needs
 * Auto-generated from src/domain/recipes/ directory (imported Dec 2025)
 */

import { Recipe } from '../types';

// FAST (≤30 min) - Chaos Night Heroes
import { onePotCreamyMushroomPasta } from '../recipes/one-pot-creamy-mushroom-pasta';
import { simpleChickenFajitas } from '../recipes/simple-chicken-fajitas';
import { spaghettiAglioEOlio } from '../recipes/spaghetti-aglio-e-olio';

// NORMAL (30–60 min) - Weeknight Winners
import { beefStroganoff } from '../recipes/beef-stroganoff';
import { lasagnaSoup } from '../recipes/lasagna-soup';
import { onePotCreamyCajunChickenPasta } from '../recipes/one-pot-creamy-cajun-chicken-pasta';
import { onePotTeriyakiChickenAndRice } from '../recipes/one-pot-teriyaki-chicken-and-rice';
import { onePotChickenRice } from '../recipes/one-pot-chicken-rice';
import { southernMeatloafRecipe } from '../recipes/southern-meatloaf';

// PROJECT (>60 min) - Weekend Batch Cooking
import { bakedMacAndCheese } from '../recipes/baked-mac-and-cheese';
import { bbqRibs } from '../recipes/bbq-ribs';
import { easyBakedZiti } from '../recipes/easy-baked-ziti';
import { homestyleChickenNoodleSoup } from '../recipes/homestyle-chicken-noodle-soup';
import { ovenBakedChickenDrumsticks } from '../recipes/oven-baked-chicken-drumsticks';
import { slowCookerPulledPork } from '../recipes/slow-cooker-pulled-pork';
import { slowCookerWhiteChickenChili } from '../recipes/slow-cooker-white-chicken-chili';
import { pastaWithTuna } from '../recipes/pasta-with-tuna';
import { easyHomemadeRiceAndBeans } from '../recipes/easy-homemade-rice-and-beans';
import { potatoBurgerBuns } from "../recipes/potato-burger-buns";
import { potatoesLyonnaise } from "../recipes/potatoes-lyonnaise";
import { skilletRoastedChickenBreastsWithGarlickyGreenBeans } from "../recipes/skillet-roasted-chicken-breasts-with-garlicky-green-beans";
import { xHNgshChOJDNChineseStirFriedTomatoesAndEggs } from "../recipes/x-h-ngsh-ch-o-j-d-n-chinese-stir-fried-tomatoes-and-eggs";
import { yakisobaJapaneseStirFriedNoodlesWithBeef } from "../recipes/yakisoba-japanese-stir-fried-noodles-with-beef";
import { acquacottaTuscanWhiteBeanAndEscaroleSoup } from "../recipes/acquacotta-tuscan-white-bean-and-escarole-soup";
import { airFryerParmesanRosemaryAndBlackPepperFrenchFries } from "../recipes/air-fryer-parmesan-rosemary-and-black-pepper-french-fries";
import { airFryerSpicyFriedChickenSandwiches } from "../recipes/air-fryer-spicy-fried-chicken-sandwiches";
import { ajoBlancoSpanishChilledAlmondAndGarlicSoup } from "../recipes/ajo-blanco-spanish-chilled-almond-and-garlic-soup";
import { albNdigasEnSalsaDeAlmendrasSpanishStyleMeatballsInAlmondSauce } from "../recipes/alb-ndigas-en-salsa-de-almendras-spanish-style-meatballs-in-almond-sauce";
import { albondigasEnChipotleMeatballsInChipotleSauce } from "../recipes/albondigas-en-chipotle-meatballs-in-chipotle-sauce";
import { aligotFrenchMashedPotatoesWithGarlicAndCheese } from "../recipes/aligot-french-mashed-potatoes-with-garlic-and-cheese";
import { allAmericanPotatoSalad } from "../recipes/all-american-potato-salad";
import { allPurposeCornbread } from "../recipes/all-purpose-cornbread";
import { allPurposeTurkeyGravy } from "../recipes/all-purpose-turkey-gravy";
import { almondCrustedChickenCutletsWithWiltedSpinachOrangeSalad } from "../recipes/almond-crusted-chicken-cutlets-with-wilted-spinach-orange-salad";
import { almondGranolaWithDriedFruit } from "../recipes/almond-granola-with-dried-fruit";
import { almostHandsFreeRisottoWithParmesanAndHerbs } from "../recipes/almost-hands-free-risotto-with-parmesan-and-herbs";
import { aluParathasPunjabiPotatoStuffedGriddleBreads } from "../recipes/alu-parathas-punjabi-potato-stuffed-griddle-breads";
import { americanPotatoSaladWithEggsAndSweetPickles } from "../recipes/american-potato-salad-with-eggs-and-sweet-pickles";
import { antipastoPastaSalad } from "../recipes/antipasto-pasta-salad";
import { appleBlackberryBetty } from "../recipes/apple-blackberry-betty";
import { appleCiderSauce } from "../recipes/apple-cider-sauce";
import { appleGalette } from "../recipes/apple-galette";
import { aristaTuscanStyleRoastPorkWithGarlicAndRosemary } from "../recipes/arista-tuscan-style-roast-pork-with-garlic-and-rosemary";
import { arrozConPolloLatinStyleChickenAndRice } from "../recipes/arroz-con-pollo-latin-style-chicken-and-rice";
import { arugulaSaladWithFigsProsciuttoWalnutsAndParmesan } from "../recipes/arugula-salad-with-figs-prosciutto-walnuts-and-parmesan";
import { asparagusHamAndGruyReFrittata } from "../recipes/asparagus-ham-and-gruy-re-frittata";
import { austrianStylePotatoSalad } from "../recipes/austrian-style-potato-salad";
import { avgolemonoGreekChickenAndRiceSoupWithEggAndLemon } from "../recipes/avgolemono-greek-chicken-and-rice-soup-with-egg-and-lemon";
import { bLCLCShakingBeef } from "../recipes/b-l-c-l-c-shaking-beef";
import { bNCh } from "../recipes/b-n-ch";
import { bNhXOSizzlingVietnameseCrepes } from "../recipes/b-nh-x-o-sizzling-vietnamese-crepes";
import { baconWrappedMeatloafWithBrownSugarKetchupGlaze } from "../recipes/bacon-wrapped-meatloaf-with-brown-sugar-ketchup-glaze";
import { baharatSpicedBeefToppingForHummus } from "../recipes/baharat-spiced-beef-topping-for-hummus";
import { bakedBrieEnCroTe } from "../recipes/baked-brie-en-cro-te";
import { bakedEggsFlorentine } from "../recipes/baked-eggs-florentine";
import { bakedEggsForSandwiches } from "../recipes/baked-eggs-for-sandwiches";
import { bakedManicotti } from "../recipes/baked-manicotti";
import { bakedZiti } from "../recipes/baked-ziti";
import { bakedSoleFilletsWithHerbsAndBreadCrumbs } from "../recipes/baked-sole-fillets-with-herbs-and-bread-crumbs";
import { bananaMuffinsWithCoconutAndMacadamia } from "../recipes/banana-muffins-with-coconut-and-macadamia";
import { bananasFoster } from "../recipes/bananas-foster";
import { bangersWithOnionGravy } from "../recipes/bangers-with-onion-gravy";
import { barbecuedPulledChicken } from "../recipes/barbecued-pulled-chicken";
import { barbecuedSalmon } from "../recipes/barbecued-salmon";
import { barleySaladWithPomegranatePistachiosAndFeta } from "../recipes/barley-salad-with-pomegranate-pistachios-and-feta";
import { basicPolenta } from "../recipes/basic-polenta";
import { bauernfrHstCkGermanFarmerSBreakfast } from "../recipes/bauernfr-hst-ck-german-farmer-s-breakfast";
import { beefAndVegetableSoup } from "../recipes/beef-and-vegetable-soup";
import { beefBulgogiKoreanMarinatedBeef } from "../recipes/beef-bulgogi-korean-marinated-beef";
import { beefEmpanadas } from "../recipes/beef-empanadas";
import { beefEnCocotteWithMushroomSauce } from "../recipes/beef-en-cocotte-with-mushroom-sauce";
import { beefHoFun } from "../recipes/beef-ho-fun";
import { beefSatay } from "../recipes/beef-satay";
import { beefStirFryWithBellPeppersAndBlackPepperSauce } from "../recipes/beef-stir-fry-with-bell-peppers-and-black-pepper-sauce";
import { beefTenderloinWithSmokyPotatoesAndPersilladeRelish } from "../recipes/beef-tenderloin-with-smoky-potatoes-and-persillade-relish";
import { beerBatteredOnionRingsWithJalapeODippingSauce } from "../recipes/beer-battered-onion-rings-with-jalape-o-dipping-sauce";
import { beetSaladWithSpicedYogurtAndWatercress } from "../recipes/beet-salad-with-spiced-yogurt-and-watercress";
import { beetsWithLemonAndAlmonds } from "../recipes/beets-with-lemon-and-almonds";
import { beijingStyleMeatSauceAndNoodles } from "../recipes/beijing-style-meat-sauce-and-noodles";
import { bestBakedApples } from "../recipes/best-baked-apples";
import { bestBakedPotatoes } from "../recipes/best-baked-potatoes";
import { bestBananaBread } from "../recipes/best-banana-bread";
import { bestBlueberryMuffins } from "../recipes/best-blueberry-muffins";
import { bestButtermilkWaffles } from "../recipes/best-buttermilk-waffles";
import { bestChickenParmesan } from "../recipes/best-chicken-parmesan";
import { bestChickenStew } from "../recipes/best-chicken-stew";
import { bestDropBiscuits } from "../recipes/best-drop-biscuits";
import { bestGrilledChickenThighs } from "../recipes/best-grilled-chicken-thighs";
import { bestLemonBars } from "../recipes/best-lemon-bars";
import { bestOldFashionedBurgers } from "../recipes/best-old-fashioned-burgers";
import { bestRoastChickenWithRootVegetables } from "../recipes/best-roast-chicken-with-root-vegetables";
import { bestSummerTomatoGratin } from "../recipes/best-summer-tomato-gratin";
import { betterBranMuffins } from "../recipes/better-bran-muffins";
import { betterChickenMarsala } from "../recipes/better-chicken-marsala";
import { biscuitBreakfastSandwiches } from "../recipes/biscuit-breakfast-sandwiches";
import { bittersweetChocolateRoulade } from "../recipes/bittersweet-chocolate-roulade";
import { blackBeanBurgers } from "../recipes/black-bean-burgers";
import { blackBeanSoup } from "../recipes/black-bean-soup";
import { blackOliveTapenade } from "../recipes/black-olive-tapenade";
import { blackenedChicken } from "../recipes/blackened-chicken";
import { blanchedGreenBeans } from "../recipes/blanched-green-beans";
import { blondies } from "../recipes/blondies";
import { blueberryBoyBait } from "../recipes/blueberry-boy-bait";
import { blueberryScones } from "../recipes/blueberry-scones";
import { boiledLobster } from "../recipes/boiled-lobster";
import { boiledPotatoesWithBlackOliveTapenade } from "../recipes/boiled-potatoes-with-black-olive-tapenade";
import { bouyourdiSpicyGreekBakedFeta } from "../recipes/bouyourdi-spicy-greek-baked-feta";
import { bowTiePastaWithPesto } from "../recipes/bow-tie-pasta-with-pesto";
import { braisedChickenThighsWithFennelOrangeAndCrackedOlives } from "../recipes/braised-chicken-thighs-with-fennel-orange-and-cracked-olives";
import { braisedChickenThighsWithLemonSpicesAndTornBasil } from "../recipes/braised-chicken-thighs-with-lemon-spices-and-torn-basil";
import { braisedChickenWithMustardAndHerbs } from "../recipes/braised-chicken-with-mustard-and-herbs";
import { braisedEggplantWithPaprikaCorianderAndYogurt } from "../recipes/braised-eggplant-with-paprika-coriander-and-yogurt";
import { braisedGreensWithBaconAndOnion } from "../recipes/braised-greens-with-bacon-and-onion";
import { braisedHalibutWithLeeksAndMustard } from "../recipes/braised-halibut-with-leeks-and-mustard";
import { braisedMonkfishWithSaffronAndCuredOlives } from "../recipes/braised-monkfish-with-saffron-and-cured-olives";
import { braisedRedPotatoesWithLemonAndChives } from "../recipes/braised-red-potatoes-with-lemon-and-chives";
import { braisedTurkey } from "../recipes/braised-turkey";
import { breadAndButterPickles } from "../recipes/bread-and-butter-pickles";
import { breadStuffingWithBaconApplesSageAndCaramelizedOnions } from "../recipes/bread-stuffing-with-bacon-apples-sage-and-caramelized-onions";
import { breakfastSausagePatties } from "../recipes/breakfast-sausage-patties";
import { breakfastStrataWithSpinachAndGruyRe } from "../recipes/breakfast-strata-with-spinach-and-gruy-re";
import { breakfastTacosScrambledEggsMigasAndCharredTortillas } from "../recipes/breakfast-tacos-scrambled-eggs-migas-and-charred-tortillas";
import { briam } from "../recipes/briam";
import { britishStyleCurrantScones } from "../recipes/british-style-currant-scones";
import { broccoliAndFetaFrittata } from "../recipes/broccoli-and-feta-frittata";
import { broccoliCheeseSoup } from "../recipes/broccoli-cheese-soup";
import { broccoliSaladWithCreamyAvocadoDressing } from "../recipes/broccoli-salad-with-creamy-avocado-dressing";
import { broiledChickenWithGravy } from "../recipes/broiled-chicken-with-gravy";
import { broiledPorkTenderloin } from "../recipes/broiled-pork-tenderloin";
import { broiledSalmonWithMustardAndCrispDilledCrust } from "../recipes/broiled-salmon-with-mustard-and-crisp-dilled-crust";
import { broiledSmashedZucchiniWithHerbedSourCream } from "../recipes/broiled-smashed-zucchini-with-herbed-sour-cream";
import { brownRiceBowlsWithVegetablesAndSalmon } from "../recipes/brown-rice-bowls-with-vegetables-and-salmon";
import { brownedButterBlondies } from "../recipes/browned-butter-blondies";
import { brusselsSproutSaladWithWarmMustardVinaigrette } from "../recipes/brussels-sprout-salad-with-warm-mustard-vinaigrette";
import { buffaloCauliflowerBites } from "../recipes/buffalo-cauliflower-bites";
import { buffaloChickenSandwiches } from "../recipes/buffalo-chicken-sandwiches";
import { buffaloWings } from "../recipes/buffalo-wings";
import { buttermilkMashedPotatoes } from "../recipes/buttermilk-mashed-potatoes";
import { buttermilkVanillaPannaCottaWithBerriesAndHoney } from "../recipes/buttermilk-vanilla-panna-cotta-with-berries-and-honey";
import { butternutSquashRisotto } from "../recipes/butternut-squash-risotto";
import { butterySpringVegetables } from "../recipes/buttery-spring-vegetables";
import { cCtelDeCamarNMexicanShrimpCocktail } from "../recipes/c-ctel-de-camar-n-mexican-shrimp-cocktail";
import { cabbageAndRedPepperSaladWithLimeCuminVinaigrette } from "../recipes/cabbage-and-red-pepper-salad-with-lime-cumin-vinaigrette";
import { caldoDeSieteMaresSoupOfTheSevenSeas } from "../recipes/caldo-de-siete-mares-soup-of-the-seven-seas";
import { caldoVerde } from "../recipes/caldo-verde";
import { campanelleWithAsparagusBasilAndBalsamicGlaze } from "../recipes/campanelle-with-asparagus-basil-and-balsamic-glaze";
import { candiedSweetPotatoCasserole } from "../recipes/candied-sweet-potato-casserole";
import { caramelSauce } from "../recipes/caramel-sauce";
import { caramelizedPearsWithBlueCheeseAndBlackPepperCaramelSauce } from "../recipes/caramelized-pears-with-blue-cheese-and-black-pepper-caramel-sauce";
import { carciofiAllaGiudiaRomanJewishFriedArtichokes } from "../recipes/carciofi-alla-giudia-roman-jewish-fried-artichokes";
import { carneAsadaMexicanStyleGrilledSteak } from "../recipes/carne-asada-mexican-style-grilled-steak";
import { carnitasMexicanPulledPork } from "../recipes/carnitas-mexican-pulled-pork";
import { carrotGingerSoup } from "../recipes/carrot-ginger-soup";
import { castIronBakedZitiWithCharredTomatoes } from "../recipes/cast-iron-baked-ziti-with-charred-tomatoes";
import { castIronThickCutSteaksWithHerbButter } from "../recipes/cast-iron-thick-cut-steaks-with-herb-butter";
import { cataplanaPortugueseSeafoodStew } from "../recipes/cataplana-portuguese-seafood-stew";
import { cauliflowerSoup } from "../recipes/cauliflower-soup";
import { cavatappiWithArugulaGoatCheeseAndSunDriedTomatoPesto } from "../recipes/cavatappi-with-arugula-goat-cheese-and-sun-dried-tomato-pesto";
import { chanaMasala } from "../recipes/chana-masala";
import { charcoalGrilledBarbecuedChickenKebabs } from "../recipes/charcoal-grilled-barbecued-chicken-kebabs";
import { cheeseAndTomatoLasagna } from "../recipes/cheese-and-tomato-lasagna";
import { cheeseSouffl } from "../recipes/cheese-souffl";
import { cheesyGarlicBread } from "../recipes/cheesy-garlic-bread";
import { chelowBaTahdigPersianStyleRiceWithGoldenCrust } from "../recipes/chelow-ba-tahdig-persian-style-rice-with-golden-crust";
import { cherryClafouti } from "../recipes/cherry-clafouti";
import { cherrySauce } from "../recipes/cherry-sauce";
import { chicagoStyleDeepDishPizza } from "../recipes/chicago-style-deep-dish-pizza";
import { chickenAndDumplings } from "../recipes/chicken-and-dumplings";
import { chickenAndSausageGumbo } from "../recipes/chicken-and-sausage-gumbo";
import { chickenBiryani } from "../recipes/chicken-biryani";
import { chickenBouillabaisse } from "../recipes/chicken-bouillabaisse";
import { chickenCanzanese } from "../recipes/chicken-canzanese";
import { chickenEnchiladasWithRedChileSauce } from "../recipes/chicken-enchiladas-with-red-chile-sauce";
import { chickenFrancese } from "../recipes/chicken-francese";
import { chickenFriedSteaks } from "../recipes/chicken-fried-steaks";
import { chickenInMolePoblanoSauce } from "../recipes/chicken-in-mole-poblano-sauce";
import { chickenMarbella } from "../recipes/chicken-marbella";
import { chickenMarsala } from "../recipes/chicken-marsala";
import { chickenPiccata } from "../recipes/chicken-piccata";
import { chickenProvenAl } from "../recipes/chicken-proven-al";
import { chickenSaltimbocca } from "../recipes/chicken-saltimbocca";
import { chickenSchnitzel } from "../recipes/chicken-schnitzel";
import { chickenTagine } from "../recipes/chicken-tagine";
import { chickenTeriyaki } from "../recipes/chicken-teriyaki";
import { chickenTikkaMasala } from "../recipes/chicken-tikka-masala";
import { chickenUnderABrickWithHerbRoastedPotatoes } from "../recipes/chicken-under-a-brick-with-herb-roasted-potatoes";
import { chickenVesuvio } from "../recipes/chicken-vesuvio";
import { chickenWith40ClovesOfGarlic } from "../recipes/chicken-with-40-cloves-of-garlic";
import { chickenYassaSenegaleseBraisedChickenWithCaramelizedOnionAndLemon } from "../recipes/chicken-yassa-senegalese-braised-chicken-with-caramelized-onion-and-lemon";
import { chileVerdeConCerdoGreenChiliWithPork } from "../recipes/chile-verde-con-cerdo-green-chili-with-pork";
import { chiliConCarne } from "../recipes/chili-con-carne";
import { chiliCrispNoodles } from "../recipes/chili-crisp-noodles";
import { chilledSobaNoodlesWithCucumberSnowPeasAndRadishes } from "../recipes/chilled-soba-noodles-with-cucumber-snow-peas-and-radishes";
import { chineseBarbecuedPork } from "../recipes/chinese-barbecued-pork";
import { chineseStyleBarbecuedSpareribs } from "../recipes/chinese-style-barbecued-spareribs";
import { chocolateHazelnutSpread } from "../recipes/chocolate-hazelnut-spread";
import { chocolateToffeeBark } from "../recipes/chocolate-toffee-bark";
import { chorizoAndPotatoTacos } from "../recipes/chorizo-and-potato-tacos";
import { chraime } from "../recipes/chraime";
import { chunkyGuacamole } from "../recipes/chunky-guacamole";
import { ciambottaItalianVegetableStew } from "../recipes/ciambotta-italian-vegetable-stew";
import { ciderGlazedPorkChops } from "../recipes/cider-glazed-pork-chops";
import { cincinnatiChili } from "../recipes/cincinnati-chili";
import { cioppino } from "../recipes/cioppino";
import { classicAmericanGarlicBread } from "../recipes/classic-american-garlic-bread";
import { classicButtermilkWaffles } from "../recipes/classic-buttermilk-waffles";
import { classicChickenNoodleSoup } from "../recipes/classic-chicken-noodle-soup";
import { classicChickenSalad } from "../recipes/classic-chicken-salad";
import { classicCrMeCaramel } from "../recipes/classic-cr-me-caramel";
import { classicFrenchFries } from "../recipes/classic-french-fries";
import { classicGazpacho } from "../recipes/classic-gazpacho";
import { classicGreenBeanCasserole } from "../recipes/classic-green-bean-casserole";
import { classicGrilledCheeseSandwiches } from "../recipes/classic-grilled-cheese-sandwiches";
import { classicIrishSodaBread } from "../recipes/classic-irish-soda-bread";
import { classicMashedPotatoes } from "../recipes/classic-mashed-potatoes";
import { classicPizzaDough } from "../recipes/classic-pizza-dough";
import { classicRoastLemonChicken } from "../recipes/classic-roast-lemon-chicken";
import { classicSloppyJoes } from "../recipes/classic-sloppy-joes";
import { classicSpaghettiAndMeatballsForACrowd } from "../recipes/classic-spaghetti-and-meatballs-for-a-crowd";
import { classicStrawberryJam } from "../recipes/classic-strawberry-jam";
import { classicStuffedBellPeppers } from "../recipes/classic-stuffed-bell-peppers";
import { codBakedInFoilWithLeeksAndCarrots } from "../recipes/cod-baked-in-foil-with-leeks-and-carrots";
import { comVietnameseRedRice } from "../recipes/com-vietnamese-red-rice";
import { congeeChineseRicePorridge } from "../recipes/congee-chinese-rice-porridge";
import { coqAuRiesling } from "../recipes/coq-au-riesling";
import { cornFritters } from "../recipes/corn-fritters";
import { cornMuffins } from "../recipes/corn-muffins";
import { cornRisotto } from "../recipes/corn-risotto";
import { cornTortillas } from "../recipes/corn-tortillas";
import { crabAndShrimpStew } from "../recipes/crab-and-shrimp-stew";
import { crabTowersWithAvocadoAndGazpachoSalsas } from "../recipes/crab-towers-with-avocado-and-gazpacho-salsas";
import { cranberryChutneyWithApplesAndCrystallizedGinger } from "../recipes/cranberry-chutney-with-apples-and-crystallized-ginger";
import { cranberryPecanMuffins } from "../recipes/cranberry-pecan-muffins";
import { creamBiscuits } from "../recipes/cream-biscuits";
import { creamScones } from "../recipes/cream-scones";
import { creamlessCreamyTomatoSoup } from "../recipes/creamless-creamy-tomato-soup";
import { creamyBakedFourCheesePasta } from "../recipes/creamy-baked-four-cheese-pasta";
import { creamyButtermilkColeslaw } from "../recipes/creamy-buttermilk-coleslaw";
import { creamyColeslaw } from "../recipes/creamy-coleslaw";
import { creamyFrenchStyleScrambledEggs } from "../recipes/creamy-french-style-scrambled-eggs";
import { creamyGazpachoAndaluz } from "../recipes/creamy-gazpacho-andaluz";
import { creamyGreenPeppercornSauce } from "../recipes/creamy-green-peppercorn-sauce";
import { creamyHerbedSpinachDip } from "../recipes/creamy-herbed-spinach-dip";
import { creamyMashedPotatoes } from "../recipes/creamy-mashed-potatoes";
import { creamyMushroomSoup } from "../recipes/creamy-mushroom-soup";
import { creamyParmesanPolenta } from "../recipes/creamy-parmesan-polenta";
import { creamyPeaSoup } from "../recipes/creamy-pea-soup";
import { creoleStyleShrimpAndSausageGumbo } from "../recipes/creole-style-shrimp-and-sausage-gumbo";
import { crepesSuzette } from "../recipes/crepes-suzette";
import { crepesWithBerriesAndApricotBeurreMont } from "../recipes/crepes-with-berries-and-apricot-beurre-mont";
import { crepesWithSugarAndLemon } from "../recipes/crepes-with-sugar-and-lemon";
import { crispBreadedChickenCutlets } from "../recipes/crisp-breaded-chicken-cutlets";
import { crispRoastButterfliedChickenWithRosemaryAndGarlic } from "../recipes/crisp-roast-butterflied-chicken-with-rosemary-and-garlic";
import { crispRoastChicken } from "../recipes/crisp-roast-chicken";
import { crispyCacioEPepeBites } from "../recipes/crispy-cacio-e-pepe-bites";
import { crispyEggplantSaladWithTomatoesHerbsAndFriedShallots } from "../recipes/crispy-eggplant-salad-with-tomatoes-herbs-and-fried-shallots";
import { crispyFishSandwiches } from "../recipes/crispy-fish-sandwiches";
import { crispyFriedChicken } from "../recipes/crispy-fried-chicken";
import { crispyOnions } from "../recipes/crispy-onions";
import { crispyOrangeBeef } from "../recipes/crispy-orange-beef";
import { crispyPanFriedChickenCutlets } from "../recipes/crispy-pan-fried-chicken-cutlets";
import { crispyPanFriedPorkChops } from "../recipes/crispy-pan-fried-pork-chops";
import { crispyPotatoLatkes } from "../recipes/crispy-potato-latkes";
import { crispyRoastedPotatoes } from "../recipes/crispy-roasted-potatoes";
import { crispySaltAndPepperShrimp } from "../recipes/crispy-salt-and-pepper-shrimp";
import { crispySmashedPotatoes } from "../recipes/crispy-smashed-potatoes";
import { crunchyBakedPorkChops } from "../recipes/crunchy-baked-pork-chops";
import { crunchyKettlePotatoChips } from "../recipes/crunchy-kettle-potato-chips";
import { crunchyOvenFriedFish } from "../recipes/crunchy-oven-fried-fish";
import { cubanShreddedBeef } from "../recipes/cuban-shredded-beef";
import { cubanStyleBlackBeansAndRice } from "../recipes/cuban-style-black-beans-and-rice";
import { cubanStylePicadillo } from "../recipes/cuban-style-picadillo";
import { curryDeviledEggsWithEasyPeelHardCookedEggs } from "../recipes/curry-deviled-eggs-with-easy-peel-hard-cooked-eggs";
import { dakgangjeongKoreanFriedChickenWings } from "../recipes/dakgangjeong-korean-fried-chicken-wings";
import { danDanMianSichuanNoodlesWithChiliSauceAndPork } from "../recipes/dan-dan-mian-sichuan-noodles-with-chili-sauce-and-pork";
import { darkChocolateFudgeSauce } from "../recipes/dark-chocolate-fudge-sauce";
import { deviledPorkChops } from "../recipes/deviled-pork-chops";
import { dinerStyleHomeFries } from "../recipes/diner-style-home-fries";
import { doChuaDaikonCarrotPickle } from "../recipes/do-chua-daikon-carrot-pickle";
import { doubleGlazedSalmonWithLemonAndThyme } from "../recipes/double-glazed-salmon-with-lemon-and-thyme";
import { driedCherryPortSauceWithOnionsAndMarmalade } from "../recipes/dried-cherry-port-sauce-with-onions-and-marmalade";
import { dryChiliChicken } from "../recipes/dry-chili-chicken";
import { duchessPotatoCasserole } from "../recipes/duchess-potato-casserole";
import { duckFatRoastedPotatoes } from "../recipes/duck-fat-roasted-potatoes";
import { easierFrenchFries } from "../recipes/easier-french-fries";
import { easierFriedChicken } from "../recipes/easier-fried-chicken";
import { easiestEverBiscuits } from "../recipes/easiest-ever-biscuits";
import { easyBeefTenderloinWithHarissaSpiceRubAndCilantroMintRelish } from "../recipes/easy-beef-tenderloin-with-harissa-spice-rub-and-cilantro-mint-relish";
import { easyGrilledBonelessPorkChops } from "../recipes/easy-grilled-boneless-pork-chops";
import { easySandwichBread } from "../recipes/easy-sandwich-bread";
import { eggplantInvoltini } from "../recipes/eggplant-involtini";
import { eggplantParmesan } from "../recipes/eggplant-parmesan";
import { eggsPipRade } from "../recipes/eggs-pip-rade";
import { enchiladasVerdes } from "../recipes/enchiladas-verdes";
import { espinacasConGarbanzosAndalusianSpinachAndChickpeas } from "../recipes/espinacas-con-garbanzos-andalusian-spinach-and-chickpeas";
import { esquitesMexicanStyleCornSalad } from "../recipes/esquites-mexican-style-corn-salad";
import { everydayFrenchToast } from "../recipes/everyday-french-toast";
import { falafel } from "../recipes/falafel";
import { familySizeTomatoBaconAndGarlicOmelet } from "../recipes/family-size-tomato-bacon-and-garlic-omelet";
import { farfalleWithTomatoesOlivesAndFeta } from "../recipes/farfalle-with-tomatoes-olives-and-feta";
import { farmhouseVegetableAndBarleySoup } from "../recipes/farmhouse-vegetable-and-barley-soup";
import { farroSaladWithAsparagusSugarSnapPeasAndTomatoes } from "../recipes/farro-salad-with-asparagus-sugar-snap-peas-and-tomatoes";
import { fastestEasiestMashedPotatoes } from "../recipes/fastest-easiest-mashed-potatoes";
import { fattoushPitaBreadSaladWithTomatoesAndCucumber } from "../recipes/fattoush-pita-bread-salad-with-tomatoes-and-cucumber";
import { favaBeansWithArtichokesAsparagusAndPeas } from "../recipes/fava-beans-with-artichokes-asparagus-and-peas";
import { fettuccineAlfredo } from "../recipes/fettuccine-alfredo";
import { filipinoChickenAdobo } from "../recipes/filipino-chicken-adobo";
import { fishAndChips } from "../recipes/fish-and-chips";
import { fishMeuniReWithBrownedButterAndLemon } from "../recipes/fish-meuni-re-with-browned-butter-and-lemon";
import { flankSteakAndArugulaSandwichesWithRedOnion } from "../recipes/flank-steak-and-arugula-sandwiches-with-red-onion";
import { fluffyDinnerRolls } from "../recipes/fluffy-dinner-rolls";
import { fluffyMashedPotatoes } from "../recipes/fluffy-mashed-potatoes";
import { fluffyScrambledEggs } from "../recipes/fluffy-scrambled-eggs";
import { foldedEnchiladas } from "../recipes/folded-enchiladas";
import { fourCheeseLasagna } from "../recipes/four-cheese-lasagna";
import { frenchChickenInAPot } from "../recipes/french-chicken-in-a-pot";
import { frenchPotatoSaladWithDijonMustardAndFinesHerbes } from "../recipes/french-potato-salad-with-dijon-mustard-and-fines-herbes";
import { frenchStylePorkChopsWithApplesAndCalvados } from "../recipes/french-style-pork-chops-with-apples-and-calvados";
import { frenchStylePorkStew } from "../recipes/french-style-pork-stew";
import { frenchStylePotRoastedPorkLoin } from "../recipes/french-style-pot-roasted-pork-loin";
import { frenchStyleStuffedChickenBreasts } from "../recipes/french-style-stuffed-chicken-breasts";
import { frenchToastCasserole } from "../recipes/french-toast-casserole";
import { frenchToast } from "../recipes/french-toast";
import { freshCornChowder } from "../recipes/fresh-corn-chowder";
import { freshCornCornbread } from "../recipes/fresh-corn-cornbread";
import { freshPappardelle } from "../recipes/fresh-pappardelle";
import { freshPastaWithoutAMachine } from "../recipes/fresh-pasta-without-a-machine";
import { freshSalmonBurgersWithSrirachaMayonnaise } from "../recipes/fresh-salmon-burgers-with-sriracha-mayonnaise";
import { friedBrownRiceWithPorkAndShrimp } from "../recipes/fried-brown-rice-with-pork-and-shrimp";
import { friedRiceWithShrimpPorkAndShiitakes } from "../recipes/fried-rice-with-shrimp-pork-and-shiitakes";
import { friedShallotsAndFriedShallotOil } from "../recipes/fried-shallots-and-fried-shallot-oil";
import { friedWholeBranzinoWithCheesyGrits } from "../recipes/fried-whole-branzino-with-cheesy-grits";
import { friedYuca } from "../recipes/fried-yuca";
import { fromTheFreezerBlueberryCinnamonMuffins } from "../recipes/from-the-freezer-blueberry-cinnamon-muffins";
import { fukujinzukeJapanesePicklesForCurry } from "../recipes/fukujinzuke-japanese-pickles-for-curry";
import { fusilliWithRicottaAndSpinach } from "../recipes/fusilli-with-ricotta-and-spinach";
import { gICuNVietnameseSummerRolls } from "../recipes/g-i-cu-n-vietnamese-summer-rolls";
import { gNgbOJDNgSichuanKungPaoChicken } from "../recipes/g-ngb-o-j-d-ng-sichuan-kung-pao-chicken";
import { gTeauBretonWithApricotFilling } from "../recipes/g-teau-breton-with-apricot-filling";
import { gaiYangThaiGrilledCornishGameHensWithChiliDippingSauce } from "../recipes/gai-yang-thai-grilled-cornish-game-hens-with-chili-dipping-sauce";
import { galettesComplTesBuckwheatCrepesWithHamEggAndCheese } from "../recipes/galettes-compl-tes-buckwheat-crepes-with-ham-egg-and-cheese";
import { garlicCroutons } from "../recipes/garlic-croutons";
import { garlicLimeGrilledPorkTenderloinSteaks } from "../recipes/garlic-lime-grilled-pork-tenderloin-steaks";
import { garlicStuddedRoastPorkLoin } from "../recipes/garlic-studded-roast-pork-loin";
import { garlickyBroiledShrimp } from "../recipes/garlicky-broiled-shrimp";
import { garlickyRoastedShrimpWithParsleyAndAnise } from "../recipes/garlicky-roasted-shrimp-with-parsley-and-anise";
import { garlickyShrimpPasta } from "../recipes/garlicky-shrimp-pasta";
import { garlickyShrimpTomatoAndWhiteBeanStew } from "../recipes/garlicky-shrimp-tomato-and-white-bean-stew";
import { garlickyShrimpWithBreadCrumbs } from "../recipes/garlicky-shrimp-with-bread-crumbs";
import { gibletPanGravyForACrowd } from "../recipes/giblet-pan-gravy-for-a-crowd";
import { gibletPanGravy } from "../recipes/giblet-pan-gravy";
import { gingersnaps } from "../recipes/gingersnaps";
import { glazedAllBeefMeatloaf } from "../recipes/glazed-all-beef-meatloaf";
import { glazedCarrots } from "../recipes/glazed-carrots";
import { glazedRoastChicken } from "../recipes/glazed-roast-chicken";
import { glazedSalmon } from "../recipes/glazed-salmon";
import { glazedSpiralSlicedHam } from "../recipes/glazed-spiral-sliced-ham";
import { gnocchiAllaRomanaSemolinaGnocchi } from "../recipes/gnocchi-alla-romana-semolina-gnocchi";
import { gnocchiLaParisienneWithArugulaTomatoesAndOlives } from "../recipes/gnocchi-la-parisienne-with-arugula-tomatoes-and-olives";
import { goanPorkVindaloo } from "../recipes/goan-pork-vindaloo";
import { goldenCornbread } from "../recipes/golden-cornbread";
import { gougRes } from "../recipes/goug-res";
import { grahamCrackerCrust } from "../recipes/graham-cracker-crust";
import { grandMarnierSouffl } from "../recipes/grand-marnier-souffl";
import { gravyForSimpleGrillRoastedTurkey } from "../recipes/gravy-for-simple-grill-roasted-turkey";
import { greekCherryTomatoSalad } from "../recipes/greek-cherry-tomato-salad";
import { greekSalad } from "../recipes/greek-salad";
import { greekStyleShrimpWithTomatoesAndFeta } from "../recipes/greek-style-shrimp-with-tomatoes-and-feta";
import { greenBeanSaladWithCherryTomatoesAndFeta } from "../recipes/green-bean-salad-with-cherry-tomatoes-and-feta";
import { greenShakshuka } from "../recipes/green-shakshuka";
import { grillRoastedBeefTenderloinForACrowd } from "../recipes/grill-roasted-beef-tenderloin-for-a-crowd";
import { grillRoastedBeerCanChicken } from "../recipes/grill-roasted-beer-can-chicken";
import { grillRoastedBoneInPorkRoast } from "../recipes/grill-roasted-bone-in-pork-roast";
import { grillRoastedBonelessTurkeyBreast } from "../recipes/grill-roasted-boneless-turkey-breast";
import { grillRoastedCornishGameHens } from "../recipes/grill-roasted-cornish-game-hens";
import { grillRoastedPorkLoin } from "../recipes/grill-roasted-pork-loin";
import { grillRoastedWholeChicken } from "../recipes/grill-roasted-whole-chicken";
import { grillSmokedHerbRubbedFlatIronSteaks } from "../recipes/grill-smoked-herb-rubbed-flat-iron-steaks";
import { grillSmokedPorkChops } from "../recipes/grill-smoked-pork-chops";
import { grillSmokedSalmon } from "../recipes/grill-smoked-salmon";
import { grilledArayesGrilledLambStuffedPitaWithYogurtSauce } from "../recipes/grilled-arayes-grilled-lamb-stuffed-pita-with-yogurt-sauce";
import { grilledArgentineSteaksWithChimichurri } from "../recipes/grilled-argentine-steaks-with-chimichurri";
import { grilledBabaGhanoush } from "../recipes/grilled-baba-ghanoush";
import { grilledBaconWrappedScallops } from "../recipes/grilled-bacon-wrapped-scallops";
import { grilledBeefKebabsWithLemonAndRosemaryMarinade } from "../recipes/grilled-beef-kebabs-with-lemon-and-rosemary-marinade";
import { grilledBeefSatay } from "../recipes/grilled-beef-satay";
import { grilledBlackenedRedSnapper } from "../recipes/grilled-blackened-red-snapper";
import { grilledBonelessBeefShortRibs } from "../recipes/grilled-boneless-beef-short-ribs";
import { grilledBonelessSkinlessChickenBreasts } from "../recipes/grilled-boneless-skinless-chicken-breasts";
import { grilledCauliflower } from "../recipes/grilled-cauliflower";
import { grilledChickenFajitas } from "../recipes/grilled-chicken-fajitas";
import { grilledChickenSatay } from "../recipes/grilled-chicken-satay";
import { grilledChickenSouvlaki } from "../recipes/grilled-chicken-souvlaki";
import { grilledChickenWithAdoboAndSazN } from "../recipes/grilled-chicken-with-adobo-and-saz-n";
import { grilledCornWithFlavoredButter } from "../recipes/grilled-corn-with-flavored-butter";
import { grilledFishTacos } from "../recipes/grilled-fish-tacos";
import { grilledFlankSteak } from "../recipes/grilled-flank-steak";
import { grilledFreshCornCornbreadWithCharredJalapeOsAndCheddar } from "../recipes/grilled-fresh-corn-cornbread-with-charred-jalape-os-and-cheddar";
import { grilledGlazedBabyBackRibs } from "../recipes/grilled-glazed-baby-back-ribs";
import { grilledGlazedBoneInChickenBreasts } from "../recipes/grilled-glazed-bone-in-chicken-breasts";
import { grilledGlazedBonelessSkinlessChickenBreasts } from "../recipes/grilled-glazed-boneless-skinless-chicken-breasts";
import { grilledGlazedPorkTenderloinRoast } from "../recipes/grilled-glazed-pork-tenderloin-roast";
import { grilledHalloumiWraps } from "../recipes/grilled-halloumi-wraps";
import { grilledHamburgers } from "../recipes/grilled-hamburgers";
import { grilledLambKebabs } from "../recipes/grilled-lamb-kebabs";
import { grilledLambKofte } from "../recipes/grilled-lamb-kofte";
import { grilledLemonChickenWithRosemary } from "../recipes/grilled-lemon-chicken-with-rosemary";
import { grilledMarinatedFlankSteak } from "../recipes/grilled-marinated-flank-steak";
import { grilledMojoMarinatedSkirtSteak } from "../recipes/grilled-mojo-marinated-skirt-steak";
import { grilledPorkChops } from "../recipes/grilled-pork-chops";
import { grilledPorkKebabsWithHoisinGlaze } from "../recipes/grilled-pork-kebabs-with-hoisin-glaze";
import { grilledPorkLoinWithAppleCranberryFilling } from "../recipes/grilled-pork-loin-with-apple-cranberry-filling";
import { grilledPorkTenderloinWithGrilledPineappleRedOnionSalsa } from "../recipes/grilled-pork-tenderloin-with-grilled-pineapple-red-onion-salsa";
import { grilledPotatoesWithGarlicAndRosemary } from "../recipes/grilled-potatoes-with-garlic-and-rosemary";
import { grilledRackOfLamb } from "../recipes/grilled-rack-of-lamb";
import { grilledRadicchio } from "../recipes/grilled-radicchio";
import { grilledSalmonFillets } from "../recipes/grilled-salmon-fillets";
import { grilledScallionTopping } from "../recipes/grilled-scallion-topping";
import { grilledScallops } from "../recipes/grilled-scallops";
import { grilledShrimpAndVegetableKebabs } from "../recipes/grilled-shrimp-and-vegetable-kebabs";
import { grilledShrimpSkewers } from "../recipes/grilled-shrimp-skewers";
import { grilledSouthernShrimpBurgers } from "../recipes/grilled-southern-shrimp-burgers";
import { grilledSpiceRubbedChickenDrumsticks } from "../recipes/grilled-spice-rubbed-chicken-drumsticks";
import { grilledSteakWithNewMexicanChileRub } from "../recipes/grilled-steak-with-new-mexican-chile-rub";
import { grilledStripOrRibEyeSteaks } from "../recipes/grilled-strip-or-rib-eye-steaks";
import { grilledStuffedChickenBreastsWithProsciuttoAndFontina } from "../recipes/grilled-stuffed-chicken-breasts-with-prosciutto-and-fontina";
import { grilledStuffedFlankSteak } from "../recipes/grilled-stuffed-flank-steak";
import { grilledStuffedPorkTenderloin } from "../recipes/grilled-stuffed-pork-tenderloin";
import { grilledSwordfishSkewersWithTomatoScallionCaponata } from "../recipes/grilled-swordfish-skewers-with-tomato-scallion-caponata";
import { grilledTomatoAndCheesePizza } from "../recipes/grilled-tomato-and-cheese-pizza";
import { grilledTomatoes } from "../recipes/grilled-tomatoes";
import { grilledTunaSteaksWithVinaigrette } from "../recipes/grilled-tuna-steaks-with-vinaigrette";
import { grilledVegetablePlatter } from "../recipes/grilled-vegetable-platter";
import { grilledWellDoneHamburgers } from "../recipes/grilled-well-done-hamburgers";
import { grilledWholeTroutWithMarjoramAndLemon } from "../recipes/grilled-whole-trout-with-marjoram-and-lemon";
import { grindYourOwnSirloinBurgerBlend } from "../recipes/grind-your-own-sirloin-burger-blend";
import { groundBeefAndCheeseEnchiladas } from "../recipes/ground-beef-and-cheese-enchiladas";
import { groundBeefTacos } from "../recipes/ground-beef-tacos";
import { grownUpGrilledCheeseSandwichesWithCheddarAndShallots } from "../recipes/grown-up-grilled-cheese-sandwiches-with-cheddar-and-shallots";
import { guayTiewTomYumGoongThaiHotAndSourNoodleSoupWithShrimp } from "../recipes/guay-tiew-tom-yum-goong-thai-hot-and-sour-noodle-soup-with-shrimp";
import { halibutLaNageWithParsnipsAndTarragon } from "../recipes/halibut-la-nage-with-parsnips-and-tarragon";
import { harGowCrystalShrimpDumplings } from "../recipes/har-gow-crystal-shrimp-dumplings";
import { hariraMoroccanLentilAndChickpeaSoup } from "../recipes/harira-moroccan-lentil-and-chickpea-soup";
import { heartyChickenNoodleSoup } from "../recipes/hearty-chicken-noodle-soup";
import { heartyLentilSoup } from "../recipes/hearty-lentil-soup";
import { heartyMinestrone } from "../recipes/hearty-minestrone";
import { heartySpanishStyleLentilAndChorizoSoup } from "../recipes/hearty-spanish-style-lentil-and-chorizo-soup";
import { herbCrustedPorkRoast } from "../recipes/herb-crusted-pork-roast";
import { herbCrustedSalmon } from "../recipes/herb-crusted-salmon";
import { herbPoachedShrimpWithCocktailSauce } from "../recipes/herb-poached-shrimp-with-cocktail-sauce";
import { herbedRoastTurkey } from "../recipes/herbed-roast-turkey";
import { highRoastButterfliedChickenWithPotatoes } from "../recipes/high-roast-butterflied-chicken-with-potatoes";
import { homeFriedTacoShells } from "../recipes/home-fried-taco-shells";
import { homeFriesForACrowd } from "../recipes/home-fries-for-a-crowd";
import { honeydewSaladWithPeanutsAndLime } from "../recipes/honeydew-salad-with-peanuts-and-lime";
import { hongKongStyleWontonNoodleSoup } from "../recipes/hong-kong-style-wonton-noodle-soup";
import { horiatikiSalataHeartyGreekSalad } from "../recipes/horiatiki-salata-hearty-greek-salad";
import { horseradishCrustedBeefTenderloin } from "../recipes/horseradish-crusted-beef-tenderloin";
import { hotAndSourSoup } from "../recipes/hot-and-sour-soup";
import { hotUkrainianBorscht } from "../recipes/hot-ukrainian-borscht";
import { huevosRancheros } from "../recipes/huevos-rancheros";
import { indianCurry } from "../recipes/indian-curry";
import { indianStyleBasmatiRice } from "../recipes/indian-style-basmati-rice";
import { indianStyleCurryWithPotatoesCauliflowerPeasAndChickpeas } from "../recipes/indian-style-curry-with-potatoes-cauliflower-peas-and-chickpeas";
import { individualFreshBerryGratinsWithZabaglione } from "../recipes/individual-fresh-berry-gratins-with-zabaglione";
import { indoorClambake } from "../recipes/indoor-clambake";
import { indoorPulledChicken } from "../recipes/indoor-pulled-chicken";
import { indoorPulledPorkWithSweetAndTangyBarbecueSauce } from "../recipes/indoor-pulled-pork-with-sweet-and-tangy-barbecue-sauce";
import { inexpensiveGrillRoastedBeefWithGarlicAndRosemary } from "../recipes/inexpensive-grill-roasted-beef-with-garlic-and-rosemary";
import { irishBrownSodaBread } from "../recipes/irish-brown-soda-bread";
import { italianChickenSoupWithParmesanDumplings } from "../recipes/italian-chicken-soup-with-parmesan-dumplings";
import { italianPastaSalad } from "../recipes/italian-pasta-salad";
import { italianSausageWithGrapesAndBalsamicVinegar } from "../recipes/italian-sausage-with-grapes-and-balsamic-vinegar";
import { italianStyleGrilledChicken } from "../recipes/italian-style-grilled-chicken";
import { italianWeddingSoup } from "../recipes/italian-wedding-soup";
import { jamaicanPepperSteak } from "../recipes/jamaican-pepper-steak";
import { japaneseCurryRouxBricks } from "../recipes/japanese-curry-roux-bricks";
import { japchaeKoreanSweetPotatoStarchNoodlesWithVegetablesAndBeef } from "../recipes/japchae-korean-sweet-potato-starch-noodles-with-vegetables-and-beef";
import { jerkChicken } from "../recipes/jerk-chicken";
import { juicyGrilledTurkeyBurgers } from "../recipes/juicy-grilled-turkey-burgers";
import { juicyPubStyleBurgers } from "../recipes/juicy-pub-style-burgers";
import { kaleCaesarSalad } from "../recipes/kale-caesar-salad";
import { kaleSaladWithRadishesGrapefruitAndCandiedPepitas } from "../recipes/kale-salad-with-radishes-grapefruit-and-candied-pepitas";
import { karaageJapaneseFriedChickenThighs } from "../recipes/karaage-japanese-fried-chicken-thighs";
import { kareRaisuJapaneseCurryRiceWithChicken } from "../recipes/kare-raisu-japanese-curry-rice-with-chicken";
import { keemaAlooGaramMasalaSpicedGroundBeefWithPotatoes } from "../recipes/keema-aloo-garam-masala-spiced-ground-beef-with-potatoes";
import { keyLimeBars } from "../recipes/key-lime-bars";
import { khaoNiaowMaMuangStickyRiceWithMango } from "../recipes/khao-niaow-ma-muang-sticky-rice-with-mango";
import { khuaKlingSouthernThaiPorkStirFry } from "../recipes/khua-kling-southern-thai-pork-stir-fry";
import { kimchiBokkeumbapKimchiFriedRice } from "../recipes/kimchi-bokkeumbap-kimchi-fried-rice";
import { kousaMihshiLebaneseStuffedSquash } from "../recipes/kousa-mihshi-lebanese-stuffed-squash";
import { kungPaoShrimp } from "../recipes/kung-pao-shrimp";
import { laoHuCaiTigerSalad } from "../recipes/lao-hu-cai-tiger-salad";
import { latinFlan } from "../recipes/latin-flan";
import { lbRTurkishPoachedEggsWithYogurtAndSpicedButter } from "../recipes/lb-r-turkish-poached-eggs-with-yogurt-and-spiced-butter";
import { leafyGreenSaladWithRichAndCreamyBlueCheeseDressing } from "../recipes/leafy-green-salad-with-rich-and-creamy-blue-cheese-dressing";
import { leekFennelAndSquashSoupWithSausage } from "../recipes/leek-fennel-and-squash-soup-with-sausage";
import { lentilSaladWithOlivesMintAndFeta } from "../recipes/lentil-salad-with-olives-mint-and-feta";
import { lighterChickenAndDumplings } from "../recipes/lighter-chicken-and-dumplings";
import { lighterChickenParmesan } from "../recipes/lighter-chicken-parmesan";
import { lighterCornChowder } from "../recipes/lighter-corn-chowder";
import { linguineAlloScoglioLinguiniWithSeafood } from "../recipes/linguine-allo-scoglio-linguini-with-seafood";
import { luDanBraisedEggs } from "../recipes/lu-dan-braised-eggs";
import { lumpiangShanghaiWithSeasonedVinegar } from "../recipes/lumpiang-shanghai-with-seasoned-vinegar";
import { madeleines } from "../recipes/madeleines";
import { mahoganyChickenThighs } from "../recipes/mahogany-chicken-thighs";
import { makeAheadCheeseSoufflS } from "../recipes/make-ahead-cheese-souffl-s";
import { makeAheadChocolateSoufflS } from "../recipes/make-ahead-chocolate-souffl-s";
import { makeAheadMashedPotatoes } from "../recipes/make-ahead-mashed-potatoes";
import { mangoOrangeAndJicamaSalad } from "../recipes/mango-orange-and-jicama-salad";
import { mapleGlazedPorkRoast } from "../recipes/maple-glazed-pork-roast";
import { mapleGlazedPorkTenderloin } from "../recipes/maple-glazed-pork-tenderloin";
import { mapoTofuSichuanBraisedTofuWithBeef } from "../recipes/mapo-tofu-sichuan-braised-tofu-with-beef";
import { marinaraSauce } from "../recipes/marinara-sauce";
import { mashedPotatoesAndRootVegetables } from "../recipes/mashed-potatoes-and-root-vegetables";
import { mashedPotatoesWithBlueCheeseAndPortCaramelizedOnions } from "../recipes/mashed-potatoes-with-blue-cheese-and-port-caramelized-onions";
import { mashedSweetPotatoes } from "../recipes/mashed-sweet-potatoes";
import { matzoBrei } from "../recipes/matzo-brei";
import { meatlessMeatSauceWithChickpeasAndMushrooms } from "../recipes/meatless-meat-sauce-with-chickpeas-and-mushrooms";
import { mechouiaTunisianStyleGrilledVegetables } from "../recipes/mechouia-tunisian-style-grilled-vegetables";
import { mediterraneanChoppedSalad } from "../recipes/mediterranean-chopped-salad";
import { mexicanRice } from "../recipes/mexican-rice";
import { mexicanStyleGrilledCorn } from "../recipes/mexican-style-grilled-corn";
import { microwaveFriedGarlic } from "../recipes/microwave-fried-garlic";
import { milkBraisedPorkLoin } from "../recipes/milk-braised-pork-loin";
import { millionaireSShortbread } from "../recipes/millionaire-s-shortbread";
import { misoMarinatedSalmon } from "../recipes/miso-marinated-salmon";
import { modernCauliflowerGratin } from "../recipes/modern-cauliflower-gratin";
import { modernCoqAuVin } from "../recipes/modern-coq-au-vin";
import { modernHamAndSplitPeaSoup } from "../recipes/modern-ham-and-split-pea-soup";
import { moquecaBrazilianShrimpAndFishStew } from "../recipes/moqueca-brazilian-shrimp-and-fish-stew";
import { moroccanFishTagine } from "../recipes/moroccan-fish-tagine";
import { muShuPork } from "../recipes/mu-shu-pork";
import { mujaddaraRiceAndLentilsWithCrispyOnions } from "../recipes/mujaddara-rice-and-lentils-with-crispy-onions";
import { mulligatawnySoup } from "../recipes/mulligatawny-soup";
import { multicookerChickenInAPotWithLemonHerbSauce } from "../recipes/multicooker-chicken-in-a-pot-with-lemon-herb-sauce";
import { multicookerHawaiianOxtailSoup } from "../recipes/multicooker-hawaiian-oxtail-soup";
import { murghMakhaniIndianButterChicken } from "../recipes/murgh-makhani-indian-butter-chicken";
import { mushroomBeefBlendedBurgers } from "../recipes/mushroom-beef-blended-burgers";
import { mushroomBisque } from "../recipes/mushroom-bisque";
import { mushroomBourguignon } from "../recipes/mushroom-bourguignon";
import { mushroomLeekBreadStuffingWithHerbs } from "../recipes/mushroom-leek-bread-stuffing-with-herbs";
import { mushroomRisotto } from "../recipes/mushroom-risotto";
import { mustardFennelPanSauce } from "../recipes/mustard-fennel-pan-sauce";
import { mustardyAppleButterGlazedPorkChops } from "../recipes/mustardy-apple-butter-glazed-pork-chops";
import { namPrikPaoThaiChiliJam } from "../recipes/nam-prik-pao-thai-chili-jam";
import { nasiGorengIndonesianStyleFriedRice } from "../recipes/nasi-goreng-indonesian-style-fried-rice";
import { negimakiJapaneseGrilledSteakAndScallionRolls } from "../recipes/negimaki-japanese-grilled-steak-and-scallion-rolls";
import { newEnglandBakedBeans } from "../recipes/new-england-baked-beans";
import { newEnglandClamChowder } from "../recipes/new-england-clam-chowder";
import { newEnglandClambake } from "../recipes/new-england-clambake";
import { newEnglandFishChowder } from "../recipes/new-england-fish-chowder";
import { newEnglandLobsterRoll } from "../recipes/new-england-lobster-roll";
import { nextLevelChickenPiccata } from "../recipes/next-level-chicken-piccata";
import { nikujagaBeefAndPotatoStew } from "../recipes/nikujaga-beef-and-potato-stew";
import { nutCrustedChickenBreastsWithLemonAndThyme } from "../recipes/nut-crusted-chicken-breasts-with-lemon-and-thyme";
import { oatmealDinnerRolls } from "../recipes/oatmeal-dinner-rolls";
import { oatmealMuffins } from "../recipes/oatmeal-muffins";
import { oatmealScones } from "../recipes/oatmeal-scones";
import { oliveOilSauceWithAnchoviesAndParsley } from "../recipes/olive-oil-sauce-with-anchovies-and-parsley";
import { oneHourBroiledChickenAndPanSauce } from "../recipes/one-hour-broiled-chicken-and-pan-sauce";
import { oneHourPizza } from "../recipes/one-hour-pizza";
import { orangeCranberryAndMintTopping } from "../recipes/orange-cranberry-and-mint-topping";
import { orangeFlavoredChicken } from "../recipes/orange-flavored-chicken";
import { orecchietteWithBroccoliRabeAndSausage } from "../recipes/orecchiette-with-broccoli-rabe-and-sausage";
import { ovenFriedChicken } from "../recipes/oven-fried-chicken";
import { ovenFriedOnionRings } from "../recipes/oven-fried-onion-rings";
import { ovenRoastedChickenThighs } from "../recipes/oven-roasted-chicken-thighs";
import { ovenRoastedPorkChops } from "../recipes/oven-roasted-pork-chops";
import { ovenRoastedSalmon } from "../recipes/oven-roasted-salmon";
import { ovenSteamedFishWithScallionsAndGinger } from "../recipes/oven-steamed-fish-with-scallions-and-ginger";
import { ovenSteamedMussels } from "../recipes/oven-steamed-mussels";
import { pODeQueijoBrazilianCheeseBread } from "../recipes/p-o-de-queijo-brazilian-cheese-bread";
import { paAmbTomQuetCatalanTomatoBread } from "../recipes/pa-amb-tom-quet-catalan-tomato-bread";
import { padThai } from "../recipes/pad-thai";
import { paellaDeVerdurasCauliflowerAndBeanPaella } from "../recipes/paella-de-verduras-cauliflower-and-bean-paella";
import { paellaOnTheGrill } from "../recipes/paella-on-the-grill";
import { paiHuangGuaSmashedCucumbers } from "../recipes/pai-huang-gua-smashed-cucumbers";
import { pakorasSouthAsianSpicedVegetableFritters } from "../recipes/pakoras-south-asian-spiced-vegetable-fritters";
import { palakDalSpinachDalWithCuminAndMustardSeeds } from "../recipes/palak-dal-spinach-dal-with-cumin-and-mustard-seeds";
import { panBagnatProvenAlTunaSandwich } from "../recipes/pan-bagnat-proven-al-tuna-sandwich";
import { panRoastedAsparagus } from "../recipes/pan-roasted-asparagus";
import { panRoastedChickenBreastsWithPotatoes } from "../recipes/pan-roasted-chicken-breasts-with-potatoes";
import { panRoastedChickenBreastsWithSageVermouthSauce } from "../recipes/pan-roasted-chicken-breasts-with-sage-vermouth-sauce";
import { panRoastedCodWithGreenOliveAlmondAndOrangeRelish } from "../recipes/pan-roasted-cod-with-green-olive-almond-and-orange-relish";
import { panRoastedHalibutSteaks } from "../recipes/pan-roasted-halibut-steaks";
import { panSearedBrinedSalmon } from "../recipes/pan-seared-brined-salmon";
import { panSearedChickenBreasts } from "../recipes/pan-seared-chicken-breasts";
import { panSearedFiletMignon } from "../recipes/pan-seared-filet-mignon";
import { panSearedFlankSteakWithMustardChiveButter } from "../recipes/pan-seared-flank-steak-with-mustard-chive-butter";
import { panSearedHalibutWithWiltedBitterSalad } from "../recipes/pan-seared-halibut-with-wilted-bitter-salad";
import { panSearedInexpensiveSteaks } from "../recipes/pan-seared-inexpensive-steaks";
import { panSearedOvenRoastedPorkTenderloin } from "../recipes/pan-seared-oven-roasted-pork-tenderloin";
import { panSearedSalmonSteaks } from "../recipes/pan-seared-salmon-steaks";
import { panSearedScallopsWithWiltedSpinachWatercressAndOrangeSalad } from "../recipes/pan-seared-scallops-with-wilted-spinach-watercress-and-orange-salad";
import { panSearedSesameCrustedTunaSteaks } from "../recipes/pan-seared-sesame-crusted-tuna-steaks";
import { panSearedShrimpWithPeanutsBlackPepperAndLime } from "../recipes/pan-seared-shrimp-with-peanuts-black-pepper-and-lime";
import { panSearedSteaks } from "../recipes/pan-seared-steaks";
import { panSearedSwordfishSteaks } from "../recipes/pan-seared-swordfish-steaks";
import { panSearedThickCutBonelessPorkChops } from "../recipes/pan-seared-thick-cut-boneless-pork-chops";
import { panSearedThickCutPorkChops } from "../recipes/pan-seared-thick-cut-pork-chops";
import { panSearedThickCutStripSteaks } from "../recipes/pan-seared-thick-cut-strip-steaks";
import { panangBeefCurry } from "../recipes/panang-beef-curry";
import { panisciaRedWineRisottoWithBeans } from "../recipes/paniscia-red-wine-risotto-with-beans";
import { panzanellaItalianBreadSalad } from "../recipes/panzanella-italian-bread-salad";
import { parmesanCrustedChickenCutlets } from "../recipes/parmesan-crusted-chicken-cutlets";
import { parmesanFarrotto } from "../recipes/parmesan-farrotto";
import { pastaAglioEOlioPastaWithGarlicAndOil } from "../recipes/pasta-aglio-e-olio-pasta-with-garlic-and-oil";
import { pastaAllAmatriciana } from "../recipes/pasta-all-amatriciana";
import { pastaAllaGriciaRigatoniWithPancettaAndPecorinoRomano } from "../recipes/pasta-alla-gricia-rigatoni-with-pancetta-and-pecorino-romano";
import { pastaAllaNorcina } from "../recipes/pasta-alla-norcina";
import { pastaAllaNorma } from "../recipes/pasta-alla-norma";
import { pastaAllaTrapanesePastaWithTomatoAndAlmondPesto } from "../recipes/pasta-alla-trapanese-pasta-with-tomato-and-almond-pesto";
import { pastaAllaZozzona } from "../recipes/pasta-alla-zozzona";
import { pastaAndFreshTomatoSauceWithGarlicAndBasil } from "../recipes/pasta-and-fresh-tomato-sauce-with-garlic-and-basil";
import { pastaCacioEUovaPastaWithCheeseAndEggs } from "../recipes/pasta-cacio-e-uova-pasta-with-cheese-and-eggs";
import { pastaCaprese } from "../recipes/pasta-caprese";
import { pastaECeciPastaWithChickpeas } from "../recipes/pasta-e-ceci-pasta-with-chickpeas";
import { pastaEFagioliItalianPastaAndBeanSoup } from "../recipes/pasta-e-fagioli-italian-pasta-and-bean-soup";
import { pastaEPiselliPastaAndPeas } from "../recipes/pasta-e-piselli-pasta-and-peas";
import { pastaFrittataWithSausageAndHotPeppers } from "../recipes/pasta-frittata-with-sausage-and-hot-peppers";
import { pastaSaladWithPesto } from "../recipes/pasta-salad-with-pesto";
import { pastaWithBurstCherryTomatoSauceAndFriedCaperCrumbs } from "../recipes/pasta-with-burst-cherry-tomato-sauce-and-fried-caper-crumbs";
import { pastaWithCauliflowerBaconAndBreadCrumbs } from "../recipes/pasta-with-cauliflower-bacon-and-bread-crumbs";
import { pastaWithCreamyLemonSichuanPeppercornSauce } from "../recipes/pasta-with-creamy-lemon-sichuan-peppercorn-sauce";
import { pastaWithCreamyTomatoSauce } from "../recipes/pasta-with-creamy-tomato-sauce";
import { pastaWithPestoPotatoesAndGreenBeans } from "../recipes/pasta-with-pesto-potatoes-and-green-beans";
import { pastaWithSautEdMushroomsAndThyme } from "../recipes/pasta-with-saut-ed-mushrooms-and-thyme";
import { pastaWithTomatoBaconAndOnion } from "../recipes/pasta-with-tomato-bacon-and-onion";
import { pastelNPuertoRicanSweetPlantainAndPicadilloCasserole } from "../recipes/pastel-n-puerto-rican-sweet-plantain-and-picadillo-casserole";
import { pastitsio } from "../recipes/pastitsio";
import { patatasBravas } from "../recipes/patatas-bravas";
import { patatasPanaderasSpanishPotatoesWithOliveOilAndWine } from "../recipes/patatas-panaderas-spanish-potatoes-with-olive-oil-and-wine";
import { peachCrisp } from "../recipes/peach-crisp";
import { pearCrisp } from "../recipes/pear-crisp";
import { pearlCouscousWithLemonMintPeasFetaAndPickledShallots } from "../recipes/pearl-couscous-with-lemon-mint-peas-feta-and-pickled-shallots";
import { penneAllaVodkaPenneWithVodkaSauce } from "../recipes/penne-alla-vodka-penne-with-vodka-sauce";
import { penneArrabbiata } from "../recipes/penne-arrabbiata";
import { penneWithToastedNutAndParsleyPesto } from "../recipes/penne-with-toasted-nut-and-parsley-pesto";
import { pepperCrustedBeefTenderloinRoast } from "../recipes/pepper-crusted-beef-tenderloin-roast";
import { pepperCrustedFiletMignon } from "../recipes/pepper-crusted-filet-mignon";
import { pepperoniPanPizza } from "../recipes/pepperoni-pan-pizza";
import { perfectPanSearedPorkTenderloinSteaks } from "../recipes/perfect-pan-seared-pork-tenderloin-steaks";
import { perfectPoachedChickenBreasts } from "../recipes/perfect-poached-chicken-breasts";
import { perfectRoastChicken } from "../recipes/perfect-roast-chicken";
import { perfectRoastedRootVegetables } from "../recipes/perfect-roasted-root-vegetables";
import { perfectScrambledEggs } from "../recipes/perfect-scrambled-eggs";
import { periPeriGrilledChicken } from "../recipes/peri-peri-grilled-chicken";
import { peruvianArrozConPollo } from "../recipes/peruvian-arroz-con-pollo";
import { peruvianRoastChickenWithGarlicAndLime } from "../recipes/peruvian-roast-chicken-with-garlic-and-lime";
import { pesceAllAcquaPazzaSouthernItalianStylePoachedFish } from "../recipes/pesce-all-acqua-pazza-southern-italian-style-poached-fish";
import { phillyCheesesteaks } from "../recipes/philly-cheesesteaks";
import { piadineItalianFlatbreads } from "../recipes/piadine-italian-flatbreads";
import { pinchosMorunosSpanishGrilledPorkKebabs } from "../recipes/pinchos-morunos-spanish-grilled-pork-kebabs";
import { pissaladiReProvenAlPizza } from "../recipes/pissaladi-re-proven-al-pizza";
import { plovRicePilafWithBeefAndCarrots } from "../recipes/plov-rice-pilaf-with-beef-and-carrots";
import { poachedFishFilletsWithSherryTomatoVinaigrette } from "../recipes/poached-fish-fillets-with-sherry-tomato-vinaigrette";
import { poachedSalmonWithHerbAndCaperVinaigrette } from "../recipes/poached-salmon-with-herb-and-caper-vinaigrette";
import { polloALaBrasaPeruvianGrillRoastedChicken } from "../recipes/pollo-a-la-brasa-peruvian-grill-roasted-chicken";
import { polloEnPepitoriaSpanishBraisedChickenWithSherryAndSaffron } from "../recipes/pollo-en-pepitoria-spanish-braised-chicken-with-sherry-and-saffron";
import { pommesAnna } from "../recipes/pommes-anna";
import { popovers } from "../recipes/popovers";
import { porkChopsWithVinegarAndSweetPeppers } from "../recipes/pork-chops-with-vinegar-and-sweet-peppers";
import { porkFennelAndLemonRaguWithPappardelle } from "../recipes/pork-fennel-and-lemon-ragu-with-pappardelle";
import { porkLoMein } from "../recipes/pork-lo-mein";
import { porkSchnitzelBreadedPorkCutlets } from "../recipes/pork-schnitzel-breaded-pork-cutlets";
import { portCherryReduction } from "../recipes/port-cherry-reduction";
import { portWineCherrySauce } from "../recipes/port-wine-cherry-sauce";
import { potatoCasseroleWithBaconAndCaramelizedOnion } from "../recipes/potato-casserole-with-bacon-and-caramelized-onion";
import { potatoGnocchiWithBrownedButterAndSageSauce } from "../recipes/potato-gnocchi-with-browned-butter-and-sage-sauce";
import { potatoRoesti } from "../recipes/potato-roesti";
import { pouletAuVinaigreChickenWithVinegar } from "../recipes/poulet-au-vinaigre-chicken-with-vinegar";
import { pressureCookerChickenNoodleSoup } from "../recipes/pressure-cooker-chicken-noodle-soup";
import { pressureCookerPotRoast } from "../recipes/pressure-cooker-pot-roast";
import { pumpkinBread } from "../recipes/pumpkin-bread";
import { pupusas } from "../recipes/pupusas";
import { quesadillas } from "../recipes/quesadillas";
import { quicheLorraine } from "../recipes/quiche-lorraine";
import { quickAllPurposeGravy } from "../recipes/quick-all-purpose-gravy";
import { quickBarbecueSauce } from "../recipes/quick-barbecue-sauce";
import { quickCandiedNuts } from "../recipes/quick-candied-nuts";
import { quickCheeseBread } from "../recipes/quick-cheese-bread";
import { quickChickenFricassee } from "../recipes/quick-chicken-fricassee";
import { quickCinnamonBunsWithButtermilkIcing } from "../recipes/quick-cinnamon-buns-with-buttermilk-icing";
import { quickCookedToughGreens } from "../recipes/quick-cooked-tough-greens";
import { quickGreenBeanCasserole } from "../recipes/quick-green-bean-casserole";
import { quickRoastedAcornSquashWithBrownSugar } from "../recipes/quick-roasted-acorn-squash-with-brown-sugar";
import { quickTaiwanesePorkRice } from "../recipes/quick-taiwanese-pork-rice";
import { quickTomatilloSauce } from "../recipes/quick-tomatillo-sauce";
import { quinoaAndVegetableStew } from "../recipes/quinoa-and-vegetable-stew";
import { quinoaPilafWithHerbsAndLemon } from "../recipes/quinoa-pilaf-with-herbs-and-lemon";
import { rajasPoblanasConCremaCharredPoblanoStripsWithCream } from "../recipes/rajas-poblanas-con-crema-charred-poblano-strips-with-cream";
import { raspberryCoulis } from "../recipes/raspberry-coulis";
import { raspberryDiagonals } from "../recipes/raspberry-diagonals";
import { raspberrySquares } from "../recipes/raspberry-squares";
import { reallyGoodGarlicBread } from "../recipes/really-good-garlic-bread";
import { redBeansAndRice } from "../recipes/red-beans-and-rice";
import { redChileChickenFilling } from "../recipes/red-chile-chicken-filling";
import { redLentilKibbeh } from "../recipes/red-lentil-kibbeh";
import { redLentilSoupWithWarmSpices } from "../recipes/red-lentil-soup-with-warm-spices";
import { redPepperAlmondSauce } from "../recipes/red-pepper-almond-sauce";
import { redSnapperCevicheWithRadishesAndOrange } from "../recipes/red-snapper-ceviche-with-radishes-and-orange";
import { redWineBraisedPorkChops } from "../recipes/red-wine-braised-pork-chops";
import { redWineOrangeSauce } from "../recipes/red-wine-orange-sauce";
import { redWinePanSauce } from "../recipes/red-wine-pan-sauce";
import { refriedBeans } from "../recipes/refried-beans";
import { rhodeIslandStyleFriedCalamari } from "../recipes/rhode-island-style-fried-calamari";
import { riceAndPastaPilaf } from "../recipes/rice-and-pasta-pilaf";
import { riceSaladWithOrangesOlivesAndAlmonds } from "../recipes/rice-salad-with-oranges-olives-and-almonds";
import { rigatoniWithTomatoesBaconAndFennel } from "../recipes/rigatoni-with-tomatoes-bacon-and-fennel";
import { roastBeefTenderloinWithCaramelizedOnionAndMushroomStuffing } from "../recipes/roast-beef-tenderloin-with-caramelized-onion-and-mushroom-stuffing";
import { roastBonelessLegOfLambWithGarlicHerbAndBreadCrumbCrust } from "../recipes/roast-boneless-leg-of-lamb-with-garlic-herb-and-bread-crumb-crust";
import { roastButterfliedLegOfLambWithCorianderCuminAndMustardSeeds } from "../recipes/roast-butterflied-leg-of-lamb-with-coriander-cumin-and-mustard-seeds";
import { roastChickenWithCouscousRoastedRedPeppersAndBasil } from "../recipes/roast-chicken-with-couscous-roasted-red-peppers-and-basil";
import { roastChickenWithWarmBreadSalad } from "../recipes/roast-chicken-with-warm-bread-salad";
import { roastFreshHam } from "../recipes/roast-fresh-ham";
import { roastRackOfLambWithRoastedRedPepperRelish } from "../recipes/roast-rack-of-lamb-with-roasted-red-pepper-relish";
import { roastedAndGlazedChickenWings } from "../recipes/roasted-and-glazed-chicken-wings";
import { roastedBoneInChickenBreasts } from "../recipes/roasted-bone-in-chicken-breasts";
import { roastedBroccoli } from "../recipes/roasted-broccoli";
import { roastedBrusselsSprouts } from "../recipes/roasted-brussels-sprouts";
import { roastedButternutSquashWithBrownedButterAndHazelnuts } from "../recipes/roasted-butternut-squash-with-browned-butter-and-hazelnuts";
import { roastedCarrots } from "../recipes/roasted-carrots";
import { roastedFennel } from "../recipes/roasted-fennel";
import { roastedFingerlingPotatoesWithMixedHerbs } from "../recipes/roasted-fingerling-potatoes-with-mixed-herbs";
import { roastedGarlicSalsaVerde } from "../recipes/roasted-garlic-salsa-verde";
import { roastedGreenBeans } from "../recipes/roasted-green-beans";
import { roastedMushroomsWithParmesanAndPineNuts } from "../recipes/roasted-mushrooms-with-parmesan-and-pine-nuts";
import { roastedOkra } from "../recipes/roasted-okra";
import { roastedOystersOnTheHalfShellWithMustardButter } from "../recipes/roasted-oysters-on-the-half-shell-with-mustard-butter";
import { roastedPoblanoAndBlackBeanEnchiladas } from "../recipes/roasted-poblano-and-black-bean-enchiladas";
import { roastedRadishesWithYogurtTahiniSauce } from "../recipes/roasted-radishes-with-yogurt-tahini-sauce";
import { roastedWholeSideOfSalmon } from "../recipes/roasted-whole-side-of-salmon";
import { rootVegetableGratin } from "../recipes/root-vegetable-gratin";
import { rosticcianaTuscanGrilledPorkRibs } from "../recipes/rosticciana-tuscan-grilled-pork-ribs";
import { rusticBreadStuffingWithCranberriesAndWalnuts } from "../recipes/rustic-bread-stuffing-with-cranberries-and-walnuts";
import { rusticPotatoLeekSoup } from "../recipes/rustic-potato-leek-soup";
import { saagPaneerIndianStyleSpinachWithFreshCheese } from "../recipes/saag-paneer-indian-style-spinach-with-fresh-cheese";
import { saladWithHerbedBakedGoatCheeseAndVinaigrette } from "../recipes/salad-with-herbed-baked-goat-cheese-and-vinaigrette";
import { saladeLyonnaise } from "../recipes/salade-lyonnaise";
import { salsaRoja } from "../recipes/salsa-roja";
import { saltBakedPotatoesWithRoastedGarlicAndRosemaryButter } from "../recipes/salt-baked-potatoes-with-roasted-garlic-and-rosemary-butter";
import { sanBeiJiThreeCupChicken } from "../recipes/san-bei-ji-three-cup-chicken";
import { sauceBaseForSteakDiane } from "../recipes/sauce-base-for-steak-diane";
import { saumonAuxLentillesPanSearedSalmonWithBraisedLentillesDuPuy } from "../recipes/saumon-aux-lentilles-pan-seared-salmon-with-braised-lentilles-du-puy";
import { sausageMeatballsAndSpaghetti } from "../recipes/sausage-meatballs-and-spaghetti";
import { sautEdBabySpinachWithAlmondsAndGoldenRaisins } from "../recipes/saut-ed-baby-spinach-with-almonds-and-golden-raisins";
import { sautEdChickenCutletsWithMustardCiderSauceChickenPaillard } from "../recipes/saut-ed-chicken-cutlets-with-mustard-cider-sauce-chicken-paillard";
import { sautEdGarlicLemonSpinach } from "../recipes/saut-ed-garlic-lemon-spinach";
import { sautEdMushroomsWithRedWineAndRosemary } from "../recipes/saut-ed-mushrooms-with-red-wine-and-rosemary";
import { sautEdPorkCutletsWithMustardCiderSauce } from "../recipes/saut-ed-pork-cutlets-with-mustard-cider-sauce";
import { sautEdTilapiaWithChiveLemonMisoButter } from "../recipes/saut-ed-tilapia-with-chive-lemon-miso-butter";
import { sautEdWildMushrooms } from "../recipes/saut-ed-wild-mushrooms";
import { savoryCornMuffins } from "../recipes/savory-corn-muffins";
import { scallopedPotatoes } from "../recipes/scalloped-potatoes";
import { scrambledEggsWithAsparagusSmokedSalmonAndChives } from "../recipes/scrambled-eggs-with-asparagus-smoked-salmon-and-chives";
import { scrambledEggsWithPintoBeansAndCotijaCheese } from "../recipes/scrambled-eggs-with-pinto-beans-and-cotija-cheese";
import { scrambledEggsWithSausageSweetPepperAndCheddarCheese } from "../recipes/scrambled-eggs-with-sausage-sweet-pepper-and-cheddar-cheese";
import { scrambledEggsWithShiitakeMushroomsAndFetaCheese } from "../recipes/scrambled-eggs-with-shiitake-mushrooms-and-feta-cheese";
import { sesameBalls } from "../recipes/sesame-balls";
import { sesameCrustedSalmonWithLemonAndGinger } from "../recipes/sesame-crusted-salmon-with-lemon-and-ginger";
import { sesameLemonCucumberSalad } from "../recipes/sesame-lemon-cucumber-salad";
import { sesameNoodlesWithShreddedChicken } from "../recipes/sesame-noodles-with-shredded-chicken";
import { shZiTULionSHeadMeatballs } from "../recipes/sh-zi-t-u-lion-s-head-meatballs";
import { shakshukaEggsInSpicyTomatoAndRoastedRedPepperSauce } from "../recipes/shakshuka-eggs-in-spicy-tomato-and-roasted-red-pepper-sauce";
import { shavedCelerySaladWithPomegranateHoneyVinaigrette } from "../recipes/shaved-celery-salad-with-pomegranate-honey-vinaigrette";
import { shrimpFraDiavoloWithLinguine } from "../recipes/shrimp-fra-diavolo-with-linguine";
import { shrimpPadThai } from "../recipes/shrimp-pad-thai";
import { shrimpRisotto } from "../recipes/shrimp-risotto";
import { shrimpSalad } from "../recipes/shrimp-salad";
import { shrimpScampi } from "../recipes/shrimp-scampi";
import { shrimpTempura } from "../recipes/shrimp-tempura";
import { shuMaiSteamedChineseDumplings } from "../recipes/shu-mai-steamed-chinese-dumplings";
import { sichuanStirFriedPorkInGarlicSauce } from "../recipes/sichuan-stir-fried-pork-in-garlic-sauce";
import { silkyButternutSquashSoup } from "../recipes/silky-butternut-squash-soup";
import { silkyRoastedEggplantWithTomatoAndFeta } from "../recipes/silky-roasted-eggplant-with-tomato-and-feta";
import { simpleBeefChiliWithKidneyBeans } from "../recipes/simple-beef-chili-with-kidney-beans";
import { simpleCheeseQuiche } from "../recipes/simple-cheese-quiche";
import { simpleItalianStyleMeatSauce } from "../recipes/simple-italian-style-meat-sauce";
import { simpleLasagnaWithHeartyTomatoMeatSauce } from "../recipes/simple-lasagna-with-hearty-tomato-meat-sauce";
import { simpleRaspberryGratin } from "../recipes/simple-raspberry-gratin";
import { simpleRicePilaf } from "../recipes/simple-rice-pilaf";
import { simpleSautEdSwissChard } from "../recipes/simple-saut-ed-swiss-chard";
import { simpleShrimpScampi } from "../recipes/simple-shrimp-scampi";
import { simplifiedPotatoGalette } from "../recipes/simplified-potato-galette";
import { singaporeNoodles } from "../recipes/singapore-noodles";
import { skilletAppleBrownBetty } from "../recipes/skillet-apple-brown-betty";
import { skilletAppleCrisp } from "../recipes/skillet-apple-crisp";
import { skilletBakedZiti } from "../recipes/skillet-baked-ziti";
import { skilletBarbecuedPorkChops } from "../recipes/skillet-barbecued-pork-chops";
import { skilletBeefStroganoff } from "../recipes/skillet-beef-stroganoff";
import { skilletCharredGreenBeansWithCrispyBreadCrumbTopping } from "../recipes/skillet-charred-green-beans-with-crispy-bread-crumb-topping";
import { skilletChickenAndRiceWithPeasAndScallions } from "../recipes/skillet-chicken-and-rice-with-peas-and-scallions";
import { skilletChickenBroccoliAndZiti } from "../recipes/skillet-chicken-broccoli-and-ziti";
import { skilletChickenFajitas } from "../recipes/skillet-chicken-fajitas";
import { skilletJambalaya } from "../recipes/skillet-jambalaya";
import { skilletLasagna } from "../recipes/skillet-lasagna";
import { skilletLemonSouffl } from "../recipes/skillet-lemon-souffl";
import { skilletRoastedBroccoli } from "../recipes/skillet-roasted-broccoli";
import { skilletRoastedBrusselsSproutsWithLemonAndPecorinoRomano } from "../recipes/skillet-roasted-brussels-sprouts-with-lemon-and-pecorino-romano";
import { skilletRoastedChickenInLemonSauce } from "../recipes/skillet-roasted-chicken-in-lemon-sauce";
import { skilletRoastedPotatoes } from "../recipes/skillet-roasted-potatoes";
import { skilletTurkeyBurgers } from "../recipes/skillet-turkey-burgers";
import { slowCookedWholeCarrots } from "../recipes/slow-cooked-whole-carrots";
import { slowCookerPorkLoinWithCranberriesAndOrange } from "../recipes/slow-cooker-pork-loin-with-cranberries-and-orange";
import { slowRoastedChickenPartsWithShallotGarlicPanSauce } from "../recipes/slow-roasted-chicken-parts-with-shallot-garlic-pan-sauce";
import { smokedChicken } from "../recipes/smoked-chicken";
import { smotheredPorkChops } from "../recipes/smothered-pork-chops";
import { snickerdoodles } from "../recipes/snickerdoodles";
import { soeupaAllaValpellinentzeSavoyCabbageSoupWithHamRyeBreadAndFontina } from "../recipes/soeupa-alla-valpellinentze-savoy-cabbage-soup-with-ham-rye-bread-and-fontina";
import { soupeAuPistouProvenAlVegetableSoup } from "../recipes/soupe-au-pistou-proven-al-vegetable-soup";
import { sousVideBonelessThickCutPorkChops } from "../recipes/sous-vide-boneless-thick-cut-pork-chops";
import { sousVidePerfectSearedSteaks } from "../recipes/sous-vide-perfect-seared-steaks";
import { southernCornFritters } from "../recipes/southern-corn-fritters";
import { southernStyleCornbread } from "../recipes/southern-style-cornbread";
import { spaghettiAlLimoneSpaghettiWithLemonAndOliveOil } from "../recipes/spaghetti-al-limone-spaghetti-with-lemon-and-olive-oil";
import { spaghettiAllAssassina } from "../recipes/spaghetti-all-assassina";
import { spaghettiAllaCarbonara } from "../recipes/spaghetti-alla-carbonara";
import { spaghettiCacioEPepeSpaghettiWithPecorinoRomanoAndBlackPepper } from "../recipes/spaghetti-cacio-e-pepe-spaghetti-with-pecorino-romano-and-black-pepper";
import { spaghettiWithMushroomAndTomatoSauceQuickMushroomRagu } from "../recipes/spaghetti-with-mushroom-and-tomato-sauce-quick-mushroom-ragu";
import { spaghettiWithOlivePesto } from "../recipes/spaghetti-with-olive-pesto";
import { spanishMigasWithFriedEggs } from "../recipes/spanish-migas-with-fried-eggs";
import { spanishStyleGarlicShrimp } from "../recipes/spanish-style-garlic-shrimp";
import { spanishStyleToastedPastaWithShrimp } from "../recipes/spanish-style-toasted-pasta-with-shrimp";
import { spanishTortillaWithRoastedRedPeppersAndPeas } from "../recipes/spanish-tortilla-with-roasted-red-peppers-and-peas";
import { spiceRubbedPicnicChicken } from "../recipes/spice-rubbed-picnic-chicken";
import { spiceRubbedPorkRoastEnCocotteWithCaramelizedOnions } from "../recipes/spice-rubbed-pork-roast-en-cocotte-with-caramelized-onions";
import { spicyMayonnaise } from "../recipes/spicy-mayonnaise";
import { spicyMexicanShreddedPorkTostadas } from "../recipes/spicy-mexican-shredded-pork-tostadas";
import { spinachAndRicottaGnudiWithTomatoButterSauce } from "../recipes/spinach-and-ricotta-gnudi-with-tomato-butter-sauce";
import { spinachLasagna } from "../recipes/spinach-lasagna";
import { springVegetablePasta } from "../recipes/spring-vegetable-pasta";
import { steakAuPoivreWithBrandiedCreamSauce } from "../recipes/steak-au-poivre-with-brandied-cream-sauce";
import { steakFajitas } from "../recipes/steak-fajitas";
import { steakFries } from "../recipes/steak-fries";
import { steakFrites } from "../recipes/steak-frites";
import { steakTacos } from "../recipes/steak-tacos";
import { steakTipsWithMushroomOnionGravy } from "../recipes/steak-tips-with-mushroom-onion-gravy";
import { stirFriedAsparagusWithShiitakeMushrooms } from "../recipes/stir-fried-asparagus-with-shiitake-mushrooms";
import { stirFriedBeefAndBroccoliWithOysterSauce } from "../recipes/stir-fried-beef-and-broccoli-with-oyster-sauce";
import { stirFriedBeefAndGaiLan } from "../recipes/stir-fried-beef-and-gai-lan";
import { stirFriedCuminBeef } from "../recipes/stir-fried-cumin-beef";
import { stirFriedPorkEggplantAndOnionWithGarlicAndBlackPepper } from "../recipes/stir-fried-pork-eggplant-and-onion-with-garlic-and-black-pepper";
import { stirFriedPortobellosWithGingerOysterSauce } from "../recipes/stir-fried-portobellos-with-ginger-oyster-sauce";
import { stirFriedShrimpWithSnowPeasAndRedBellPepperInHotAndSourSauce } from "../recipes/stir-fried-shrimp-with-snow-peas-and-red-bell-pepper-in-hot-and-sour-sauce";
import { stirFriedThaiStyleBeefWithChilesAndShallots } from "../recipes/stir-fried-thai-style-beef-with-chiles-and-shallots";
import { stirFriedTofuSnowPeasAndRedOnionWithHotAndSourSauce } from "../recipes/stir-fried-tofu-snow-peas-and-red-onion-with-hot-and-sour-sauce";
import { stovetopRoastChickenWithLemonHerbSauce } from "../recipes/stovetop-roast-chicken-with-lemon-herb-sauce";
import { strawberryTopping } from "../recipes/strawberry-topping";
import { streamlinedFrenchOnionSoup } from "../recipes/streamlined-french-onion-soup";
import { struffoliNeapolitanHoneyBalls } from "../recipes/struffoli-neapolitan-honey-balls";
import { stuffedChickenCutletsWithHamAndCheddar } from "../recipes/stuffed-chicken-cutlets-with-ham-and-cheddar";
import { stuffedPorkChops } from "../recipes/stuffed-pork-chops";
import { stuffedRoastButterfliedChicken } from "../recipes/stuffed-roast-butterflied-chicken";
import { suanLaBaiCaiSourAndHotNapaCabbage } from "../recipes/suan-la-bai-cai-sour-and-hot-napa-cabbage";
import { succotashWithButterBeansCornAndRedPepper } from "../recipes/succotash-with-butter-beans-corn-and-red-pepper";
import { summerPastaPuttanesca } from "../recipes/summer-pasta-puttanesca";
import { summerVegetableGratin } from "../recipes/summer-vegetable-gratin";
import { sungChoyBaoChineseChickenLettuceWraps } from "../recipes/sung-choy-bao-chinese-chicken-lettuce-wraps";
import { superGreensSoupWithLemonTarragonCream } from "../recipes/super-greens-soup-with-lemon-tarragon-cream";
import { sweetAndSaucyGrilledSalmonWithLimeJalapeOGlaze } from "../recipes/sweet-and-saucy-grilled-salmon-with-lime-jalape-o-glaze";
import { sweetAndTangyBarbecuedChicken } from "../recipes/sweet-and-tangy-barbecued-chicken";
import { sweetAndTangyGrilledCountryStylePorkRibs } from "../recipes/sweet-and-tangy-grilled-country-style-pork-ribs";
import { sweetAndTangyOvenBarbecuedChicken } from "../recipes/sweet-and-tangy-oven-barbecued-chicken";
import { sweetPotatoSoup } from "../recipes/sweet-potato-soup";
import { swissChardAndKaleGratin } from "../recipes/swiss-chard-and-kale-gratin";
import { tabbouleh } from "../recipes/tabbouleh";
import { tacosAlCarbNGrilledSteakTacos } from "../recipes/tacos-al-carb-n-grilled-steak-tacos";
import { tacosDoradosCrispyGroundBeefTacos } from "../recipes/tacos-dorados-crispy-ground-beef-tacos";
import { tacosGobernador } from "../recipes/tacos-gobernador";
import { tagliatelleWithProsciuttoAndPeas } from "../recipes/tagliatelle-with-prosciutto-and-peas";
import { tandooriChicken } from "../recipes/tandoori-chicken";
import { tandooriSalmon } from "../recipes/tandoori-salmon";
import { tangerineAndGingerRelish } from "../recipes/tangerine-and-ginger-relish";
import { tenMinuteSteelCutOatmeal } from "../recipes/ten-minute-steel-cut-oatmeal";
import { tenderJuicyGrilledBurgers } from "../recipes/tender-juicy-grilled-burgers";
import { teriyakiStirFriedBeefWithGreenBeansAndShiitakes } from "../recipes/teriyaki-stir-fried-beef-with-green-beans-and-shiitakes";
import { thaiChickenCurryWithPotatoesAndPeanuts } from "../recipes/thai-chicken-curry-with-potatoes-and-peanuts";
import { thaiChickenSoup } from "../recipes/thai-chicken-soup";
import { thaiGreenCurryWithChickenBroccoliAndMushrooms } from "../recipes/thai-green-curry-with-chicken-broccoli-and-mushrooms";
import { thaiGrilledBeefSalad } from "../recipes/thai-grilled-beef-salad";
import { thaiPorkLettuceWraps } from "../recipes/thai-pork-lettuce-wraps";
import { thaiStyleChickenWithBasil } from "../recipes/thai-style-chicken-with-basil";
import { thaiStyleGrilledChickenWithSpicySweetAndSourDippingSauce } from "../recipes/thai-style-grilled-chicken-with-spicy-sweet-and-sour-dipping-sauce";
import { thaiStyleStirFriedNoodlesWithChickenAndBroccolini } from "../recipes/thai-style-stir-fried-noodles-with-chicken-and-broccolini";
import { thickCutOvenFries } from "../recipes/thick-cut-oven-fries";
import { thickCutPorkTenderloinMedallions } from "../recipes/thick-cut-pork-tenderloin-medallions";
import { thickCutSweetPotatoFries } from "../recipes/thick-cut-sweet-potato-fries";
import { thymeSherryVinegarPanSauce } from "../recipes/thyme-sherry-vinegar-pan-sauce";
import { tingaDePolloShreddedChickenTacos } from "../recipes/tinga-de-pollo-shredded-chicken-tacos";
import { tiramisu } from "../recipes/tiramisu";
import { tonkatsuJapaneseFriedPorkChops } from "../recipes/tonkatsu-japanese-fried-pork-chops";
import { tortaCaprese } from "../recipes/torta-caprese";
import { tortillaSoup } from "../recipes/tortilla-soup";
import { tripleMushroomPasta } from "../recipes/triple-mushroom-pasta";
import { turkeyBreastEnCocotteWithPanGravy } from "../recipes/turkey-breast-en-cocotte-with-pan-gravy";
import { turkeyGravyForJuliaChildSStuffedTurkeyUpdated } from "../recipes/turkey-gravy-for-julia-child-s-stuffed-turkey-updated";
import { turkeyMeatloafWithKetchupBrownSugarGlaze } from "../recipes/turkey-meatloaf-with-ketchup-brown-sugar-glaze";
import { turkeyPattyMelts } from "../recipes/turkey-patty-melts";
import { turkeySausageLasagna } from "../recipes/turkey-sausage-lasagna";
import { turkeyTetrazzini } from "../recipes/turkey-tetrazzini";
import { twiceBakedPotatoes } from "../recipes/twice-baked-potatoes";
import { ultimateBananaBread } from "../recipes/ultimate-banana-bread";
import { ultimateCreamOfTomatoSoup } from "../recipes/ultimate-cream-of-tomato-soup";
import { ultimateFlakyButtermilkBiscuits } from "../recipes/ultimate-flaky-buttermilk-biscuits";
import { ultimateGreenBeanCasserole } from "../recipes/ultimate-green-bean-casserole";
import { ultimateVeggieBurgers } from "../recipes/ultimate-veggie-burgers";
import { ultracreamyHummus } from "../recipes/ultracreamy-hummus";
import { ultranuttyPecanBars } from "../recipes/ultranutty-pecan-bars";
import { veganBajaStyleCauliflowerTacos } from "../recipes/vegan-baja-style-cauliflower-tacos";
import { veganPintoBeanBeetBurgers } from "../recipes/vegan-pinto-bean-beet-burgers";
import { vegetableBibimbapWithNurungji } from "../recipes/vegetable-bibimbap-with-nurungji";
import { vegetableLasagna } from "../recipes/vegetable-lasagna";
import { vietnameseBeefPho } from "../recipes/vietnamese-beef-pho";
import { vietnameseStyleCaramelChickenWithBroccoli } from "../recipes/vietnamese-style-caramel-chicken-with-broccoli";
import { vospovKofteRedLentilKofte } from "../recipes/vospov-kofte-red-lentil-kofte";
import { walkawayRatatouille } from "../recipes/walkaway-ratatouille";
import { warmSpicedPecansWithRumGlaze } from "../recipes/warm-spiced-pecans-with-rum-glaze";
import { weeknightPastaBolognese } from "../recipes/weeknight-pasta-bolognese";
import { weeknightRoastChicken } from "../recipes/weeknight-roast-chicken";
import { weeknightTagliatelleWithBologneseSauce } from "../recipes/weeknight-tagliatelle-with-bolognese-sauce";
import { whiteBeanAndMushroomGratin } from "../recipes/white-bean-and-mushroom-gratin";
import { wildRiceAndMushroomSoup } from "../recipes/wild-rice-and-mushroom-soup";
import { wildRicePilafWithPecansAndDriedCranberries } from "../recipes/wild-rice-pilaf-with-pecans-and-dried-cranberries";
import { wiltedSpinachSaladWithWarmBaconDressing } from "../recipes/wilted-spinach-salad-with-warm-bacon-dressing";
import { yeastedWaffles } from "../recipes/yeasted-waffles";
import { zaaloukMoroccanEggplantMeze } from "../recipes/zaalouk-moroccan-eggplant-meze";
import { zarzuelaSpanishSeafoodStew } from "../recipes/zarzuela-spanish-seafood-stew";
import { zhaPaiguTaiwaneseFriedPorkChops } from "../recipes/zha-paigu-taiwanese-fried-pork-chops";
import { zucchiniBread } from "../recipes/zucchini-bread";
import { grillRoastedBeefTenderloin } from "../recipes/grill-roasted-beef-tenderloin";
import { paella } from "../recipes/paella";
import { panSearedScallops } from "../recipes/pan-seared-scallops";
import { panSearedShrimp } from "../recipes/pan-seared-shrimp";
import { pannaCotta } from "../recipes/panna-cotta";
import { pitaBread } from "../recipes/pita-bread";
import { roastBeefTenderloin } from "../recipes/roast-beef-tenderloin";
import { roastedCornishGameHens } from "../recipes/roasted-cornish-game-hens";
import { sauceBase } from "../recipes/sauce-base";
import { shrimpCocktail } from "../recipes/shrimp-cocktail";
import { shrimpFraDiavolo } from "../recipes/shrimp-fra-diavolo";
import { simpleGrillRoastedTurkey } from "../recipes/simple-grill-roasted-turkey";
import { smashedPotatoes } from "../recipes/smashed-potatoes";
import { spaghettiAndMeatballs } from "../recipes/spaghetti-and-meatballs";
import { whiteChickenChili } from "../recipes/white-chicken-chili";
import { alcatraPortugueseStyleBeefStew } from "../recipes/alcatra-portuguese-style-beef-stew";
import { almostNoKneadBread } from "../recipes/almost-no-knead-bread";
import { almostNoKneadSourdoughBread } from "../recipes/almost-no-knead-sourdough-bread";
import { authenticBaguettesAtHome } from "../recipes/authentic-baguettes-at-home";
import { bakedAlaska } from "../recipes/baked-alaska";
import { bakedBreadStuffingWithSausageDriedCherriesAndPecans } from "../recipes/baked-bread-stuffing-with-sausage-dried-cherries-and-pecans";
import { baklava } from "../recipes/baklava";
import { barbecuedBabyBackRibs } from "../recipes/barbecued-baby-back-ribs";
import { barbecuedPulledPork } from "../recipes/barbecued-pulled-pork";
import { barbecuedWholeBeefBrisketWithSpicyChiliRub } from "../recipes/barbecued-whole-beef-brisket-with-spicy-chili-rub";
import { beefBraisedInBarolo } from "../recipes/beef-braised-in-barolo";
import { beefBurgundy } from "../recipes/beef-burgundy";
import { beefShortRibRagu } from "../recipes/beef-short-rib-ragu";
import { beefTopLoinRoastWithPotatoes } from "../recipes/beef-top-loin-roast-with-potatoes";
import { beefWellington } from "../recipes/beef-wellington";
import { bestBeefStew } from "../recipes/best-beef-stew";
import { bestFrenchOnionSoup } from "../recipes/best-french-onion-soup";
import { bestGroundBeefChili } from "../recipes/best-ground-beef-chili";
import { bestPrimeRib } from "../recipes/best-prime-rib";
import { bestShortbread } from "../recipes/best-shortbread";
import { bestVegetarianChili } from "../recipes/best-vegetarian-chili";
import { bostonBakedBeans } from "../recipes/boston-baked-beans";
import { bostonBrownBread } from "../recipes/boston-brown-bread";
import { braciole } from "../recipes/braciole";
import { braisedBeefShortRibs } from "../recipes/braised-beef-short-ribs";
import { braisedBrisketWithPomegranateCuminAndCilantro } from "../recipes/braised-brisket-with-pomegranate-cumin-and-cilantro";
import { braisedCollardGreens } from "../recipes/braised-collard-greens";
import { braisedLambShanksWithRedWineAndHerbesDeProvence } from "../recipes/braised-lamb-shanks-with-red-wine-and-herbes-de-provence";
import { braisedOxtailsWithWhiteBeansTomatoesAndAleppoPepper } from "../recipes/braised-oxtails-with-white-beans-tomatoes-and-aleppo-pepper";
import { bretonKouignAmann } from "../recipes/breton-kouign-amann";
import { caramelEspressoYuleLog } from "../recipes/caramel-espresso-yule-log";
import { carbonnadeLaFlamande } from "../recipes/carbonnade-la-flamande";
import { carneAdovadaBraisedNewMexicoStylePorkInRedChileSauce } from "../recipes/carne-adovada-braised-new-mexico-style-pork-in-red-chile-sauce";
import { carneDeshebradaShreddedBeefTacos } from "../recipes/carne-deshebrada-shredded-beef-tacos";
import { castIronPanPizza } from "../recipes/cast-iron-pan-pizza";
import { catalanStyleBeefStewWithMushrooms } from "../recipes/catalan-style-beef-stew-with-mushrooms";
import { challah } from "../recipes/challah";
import { chickenBroth } from "../recipes/chicken-broth";
import { chickenKyiv } from "../recipes/chicken-kyiv";
import { chinesePorkDumplings } from "../recipes/chinese-pork-dumplings";
import { chocolateRaspberryTorte } from "../recipes/chocolate-raspberry-torte";
import { chouxAuCraquelin } from "../recipes/choux-au-craquelin";
import { ciabatta } from "../recipes/ciabatta";
import { cinnamonSwirlBread } from "../recipes/cinnamon-swirl-bread";
import { classicCrMeBrLE } from "../recipes/classic-cr-me-br-l-e";
import { classicRoastStuffedTurkey } from "../recipes/classic-roast-stuffed-turkey";
import { classicRoastTurkey } from "../recipes/classic-roast-turkey";
import { crescentShapedRugelachWithRaisinWalnutFilling } from "../recipes/crescent-shaped-rugelach-with-raisin-walnut-filling";
import { crispSkinHighRoastButterfliedTurkeyWithSausageDressing } from "../recipes/crisp-skin-high-roast-butterflied-turkey-with-sausage-dressing";
import { crispySlowRoastedPorkBelly } from "../recipes/crispy-slow-roasted-pork-belly";
import { croissants } from "../recipes/croissants";
import { daubeProvenAl } from "../recipes/daube-proven-al";
import { deepDishPizza } from "../recipes/deep-dish-pizza";
import { deliRyeBread } from "../recipes/deli-rye-bread";
import { diyChiliOil } from "../recipes/diy-chili-oil";
import { drunkenBeans } from "../recipes/drunken-beans";
import { easierRoastTurkeyAndGravy } from "../recipes/easier-roast-turkey-and-gravy";
import { etonMess } from "../recipes/eton-mess";
import { fennelCorianderTopSirloinRoast } from "../recipes/fennel-coriander-top-sirloin-roast";
import { fettuccineWithBologneseSauce } from "../recipes/fettuccine-with-bolognese-sauce";
import { fougasse } from "../recipes/fougasse";
import { frenchStyleChickenAndStuffingInAPot } from "../recipes/french-style-chicken-and-stuffing-in-a-pot";
import { frozenYogurt } from "../recipes/frozen-yogurt";
import { glazedBonelessBeefShortRibs } from "../recipes/glazed-boneless-beef-short-ribs";
import { gravlax } from "../recipes/gravlax";
import { grillRoastedBeefShortRibs } from "../recipes/grill-roasted-beef-short-ribs";
import { grillRoastedTurkey } from "../recipes/grill-roasted-turkey";
import { guaBaoTaiwaneseSteamedBunsWithBraisedPorkBelly } from "../recipes/gua-bao-taiwanese-steamed-buns-with-braised-pork-belly";
import { hNgShONiRUChineseBraisedBeef } from "../recipes/h-ng-sh-o-ni-r-u-chinese-braised-beef";
import { handRolledMeatRavioli } from "../recipes/hand-rolled-meat-ravioli";
import { heartyBeefAndVegetableStew } from "../recipes/hearty-beef-and-vegetable-stew";
import { heartyHamAndSplitPeaSoupWithPotatoes } from "../recipes/hearty-ham-and-split-pea-soup-with-potatoes";
import { heartyTuscanBeanStew } from "../recipes/hearty-tuscan-bean-stew";
import { homeCornedBeefWithVegetables } from "../recipes/home-corned-beef-with-vegetables";
import { homemadeNaan } from "../recipes/homemade-naan";
import { hungarianBeefStew } from "../recipes/hungarian-beef-stew";
import { irishStewWithCarrotsAndTurnips } from "../recipes/irish-stew-with-carrots-and-turnips";
import { jamaicanStewPeasWithSpinners } from "../recipes/jamaican-stew-peas-with-spinners";
import { juliaChildSStuffedTurkeyUpdated } from "../recipes/julia-child-s-stuffed-turkey-updated";
import { kanelbullarSwedishCinnamonBuns } from "../recipes/kanelbullar-swedish-cinnamon-buns";
import { kansasCityStickyRibs } from "../recipes/kansas-city-sticky-ribs";
import { lahmajunArmenianFlatbread } from "../recipes/lahmajun-armenian-flatbread";
import { lambBarbacoa } from "../recipes/lamb-barbacoa";
import { laugenbrezelnGermanLyePretzels } from "../recipes/laugenbrezeln-german-lye-pretzels";
import { lemonPossetWithBerries } from "../recipes/lemon-posset-with-berries";
import { liGeWaffles } from "../recipes/li-ge-waffles";
import { linzertorte } from "../recipes/linzertorte";
import { maAmoul } from "../recipes/ma-amoul";
import { makeAheadTurkeyGravy } from "../recipes/make-ahead-turkey-gravy";
import { makeWayAheadDinnerRolls } from "../recipes/make-way-ahead-dinner-rolls";
import { memphisStyleBarbecuedSpareribs } from "../recipes/memphis-style-barbecued-spareribs";
import { modernBeefBurgundy } from "../recipes/modern-beef-burgundy";
import { moussaka } from "../recipes/moussaka";
import { multigrainBread } from "../recipes/multigrain-bread";
import { mushroomAndLeekGaletteWithGorgonzola } from "../recipes/mushroom-and-leek-galette-with-gorgonzola";
import { newEnglandStyleHomeCornedBeefAndCabbage } from "../recipes/new-england-style-home-corned-beef-and-cabbage";
import { newYorkBagels } from "../recipes/new-york-bagels";
import { noKneadBrioche } from "../recipes/no-knead-brioche";
import { oldFashionedPotRoast } from "../recipes/old-fashioned-pot-roast";
import { oldFashionedStuffedTurkey } from "../recipes/old-fashioned-stuffed-turkey";
import { onionBraisedBeefBrisket } from "../recipes/onion-braised-beef-brisket";
import { ossoBuco } from "../recipes/osso-buco";
import { ourFavoriteChili } from "../recipes/our-favorite-chili";
import { ovenBarbecuedSpareribs } from "../recipes/oven-barbecued-spareribs";
import { paneFrancese } from "../recipes/pane-francese";
import { pappardelleWithDuckAndChestnutRagu } from "../recipes/pappardelle-with-duck-and-chestnut-ragu";
import { parisBrest } from "../recipes/paris-brest";
import { pastaWithHeartyItalianMeatSauceSundayGravy } from "../recipes/pasta-with-hearty-italian-meat-sauce-sunday-gravy";
import { pastaWithRusticSlowSimmeredTomatoSauceWithMeat } from "../recipes/pasta-with-rustic-slow-simmered-tomato-sauce-with-meat";
import { pavlovaWithFruitAndWhippedCream } from "../recipes/pavlova-with-fruit-and-whipped-cream";
import { piciAllaBoscaiolaHandmadePastaWithMushroomsAndSausage } from "../recipes/pici-alla-boscaiola-handmade-pasta-with-mushrooms-and-sausage";
import { pizzaAlTaglioWithArugulaAndFreshMozzarella } from "../recipes/pizza-al-taglio-with-arugula-and-fresh-mozzarella";
import { pizzaBianca } from "../recipes/pizza-bianca";
import { porchettaStyleTurkeyBreast } from "../recipes/porchetta-style-turkey-breast";
import { porchetta } from "../recipes/porchetta";
import { potRoastWithRootVegetables } from "../recipes/pot-roast-with-root-vegetables";
import { profiteroles } from "../recipes/profiteroles";
import { raguAllaBolognese } from "../recipes/ragu-alla-bolognese";
import { raspberryCharlotte } from "../recipes/raspberry-charlotte";
import { redPepperCoques } from "../recipes/red-pepper-coques";
import { rigatoniWithBeefAndOnionRagu } from "../recipes/rigatoni-with-beef-and-onion-ragu";
import { roastSaltedTurkey } from "../recipes/roast-salted-turkey";
import { roastTurkeyAndGravyWithHerbesDeProvenceAndLemon } from "../recipes/roast-turkey-and-gravy-with-herbes-de-provence-and-lemon";
import { roastTurkeyForACrowd } from "../recipes/roast-turkey-for-a-crowd";
import { roastWholeTurkeyBreastWithGravy } from "../recipes/roast-whole-turkey-breast-with-gravy";
import { roastedBrinedTurkey } from "../recipes/roasted-brined-turkey";
import { ropaViejaCubanBraisedAndShreddedBeef } from "../recipes/ropa-vieja-cuban-braised-and-shredded-beef";
import { rosemaryFocaccia } from "../recipes/rosemary-focaccia";
import { rusticCountryBread } from "../recipes/rustic-country-bread";
import { rusticDinnerRolls } from "../recipes/rustic-dinner-rolls";
import { simplePotAuFeu } from "../recipes/simple-pot-au-feu";
import { simplePotRoast } from "../recipes/simple-pot-roast";
import { simplifiedCassouletWithPorkAndKielbasa } from "../recipes/simplified-cassoulet-with-pork-and-kielbasa";
import { slowCookerBeefBurgundy } from "../recipes/slow-cooker-beef-burgundy";
import { slowCookerBeerBraisedShortRibs } from "../recipes/slow-cooker-beer-braised-short-ribs";
import { slowCookerOldFashionedChickenNoodleSoup } from "../recipes/slow-cooker-old-fashioned-chicken-noodle-soup";
import { slowRoastedBeef } from "../recipes/slow-roasted-beef";
import { slowRoastedBoneInPorkRibRoast } from "../recipes/slow-roasted-bone-in-pork-rib-roast";
import { slowRoastedPorkShoulderWithPeachSauce } from "../recipes/slow-roasted-pork-shoulder-with-peach-sauce";
import { slowRoastedTurkeyWithGravy } from "../recipes/slow-roasted-turkey-with-gravy";
import { smokyPulledPorkOnAGasGrill } from "../recipes/smoky-pulled-pork-on-a-gas-grill";
import { sousVideCochinitaPibil } from "../recipes/sous-vide-cochinita-pibil";
import { sousVideCrMeBrLE } from "../recipes/sous-vide-cr-me-br-l-e";
import { sousVidePrimeRib } from "../recipes/sous-vide-prime-rib";
import { sousVideRosemaryMustardSeedCrustedRoastBeef } from "../recipes/sous-vide-rosemary-mustard-seed-crusted-roast-beef";
import { spiralSlicedHamWithCiderVinegarCaramel } from "../recipes/spiral-sliced-ham-with-cider-vinegar-caramel";
import { stickyBunsWithPecans } from "../recipes/sticky-buns-with-pecans";
import { stollen } from "../recipes/stollen";
import { stuffedSpatchcockedTurkey } from "../recipes/stuffed-spatchcocked-turkey";
import { tacosAlPastorSpicyPorkTacos } from "../recipes/tacos-al-pastor-spicy-pork-tacos";
import { tamales } from "../recipes/tamales";
import { texasStyleBarbecuedBeefRibs } from "../recipes/texas-style-barbecued-beef-ribs";
import { theBestGlutenFreePizza } from "../recipes/the-best-gluten-free-pizza";
import { thickCrustSicilianStylePizza } from "../recipes/thick-crust-sicilian-style-pizza";
import { thinCrustPizza } from "../recipes/thin-crust-pizza";
import { thinCrustWholeWheatPizzaWithGarlicOilThreeCheesesAndBasil } from "../recipes/thin-crust-whole-wheat-pizza-with-garlic-oil-three-cheeses-and-basil";
import { turkeyAndGravyForACrowd } from "../recipes/turkey-and-gravy-for-a-crowd";
import { turkeyThighConfitWithCitrusMustardSauce } from "../recipes/turkey-thigh-confit-with-citrus-mustard-sauce";
import { tuscanStyleBeefStew } from "../recipes/tuscan-style-beef-stew";
import { ultimateGrilledPizza } from "../recipes/ultimate-grilled-pizza";
import { ultimateStickyBuns } from "../recipes/ultimate-sticky-buns";
import { wholeWheatSandwichBread } from "../recipes/whole-wheat-sandwich-bread";
import { zaAtarFingerBread } from "../recipes/za-atar-finger-bread";

/**
 * MVP Recipe Catalog
 * 
 * Coverage:
 * ✅ 3 FAST recipes (chaos nights)
 * ✅ 6 NORMAL recipes (weeknights)
 * ✅ 7 PROJECT recipes (weekend/batch)
 * ✅ Equipment: sheet pan, Dutch oven, slow cooker
 * ✅ Preflight examples: MARINATE (beef stroganoff), SLOW_COOK (2 slow cooker recipes)
 * ⏳ Missing preflight types: THAW, LONG_PREP (need real Budget Bytes recipes)
 * ✅ Tags: budget_friendly, comfort_food, dietary options
 * ✅ All recipes: ≤20 ingredients, family-friendly, budget-optimized
 */
const buildCatalog = (): Recipe[] => {
  // @ts-expect-error -- large literal triggers "union type too complex"; values are generated Recipe objects
  const recipes: Recipe[] = [
    xHNgshChOJDNChineseStirFriedTomatoesAndEggs,
    onePotCreamyMushroomPasta,
  simpleChickenFajitas,
  spaghettiAglioEOlio,
    potatoBurgerBuns,
    beefStroganoff, // MARINATE preflight
  lasagnaSoup,
  onePotCreamyCajunChickenPasta,
  onePotTeriyakiChickenAndRice,
  onePotChickenRice,
  southernMeatloafRecipe,
  pastaWithTuna,
  easyHomemadeRiceAndBeans,
    alcatraPortugueseStyleBeefStew,
    bakedMacAndCheese,
  bbqRibs,
  easyBakedZiti,
  homestyleChickenNoodleSoup,
  ovenBakedChickenDrumsticks,
  slowCookerPulledPork, // SLOW_COOK preflight
  slowCookerWhiteChickenChili, // SLOW_COOK preflight
    potatoesLyonnaise,
    skilletRoastedChickenBreastsWithGarlickyGreenBeans,
    yakisobaJapaneseStirFriedNoodlesWithBeef,
    acquacottaTuscanWhiteBeanAndEscaroleSoup,
    airFryerParmesanRosemaryAndBlackPepperFrenchFries,
    airFryerSpicyFriedChickenSandwiches,
    ajoBlancoSpanishChilledAlmondAndGarlicSoup,
    albNdigasEnSalsaDeAlmendrasSpanishStyleMeatballsInAlmondSauce,
    albondigasEnChipotleMeatballsInChipotleSauce,
    aligotFrenchMashedPotatoesWithGarlicAndCheese,
    allAmericanPotatoSalad,
    allPurposeCornbread,
    allPurposeTurkeyGravy,
    almondCrustedChickenCutletsWithWiltedSpinachOrangeSalad,
    almondGranolaWithDriedFruit,
    almostHandsFreeRisottoWithParmesanAndHerbs,
    aluParathasPunjabiPotatoStuffedGriddleBreads,
    americanPotatoSaladWithEggsAndSweetPickles,
    antipastoPastaSalad,
    appleBlackberryBetty,
    appleCiderSauce,
    appleGalette,
    aristaTuscanStyleRoastPorkWithGarlicAndRosemary,
    arrozConPolloLatinStyleChickenAndRice,
    arugulaSaladWithFigsProsciuttoWalnutsAndParmesan,
    asparagusHamAndGruyReFrittata,
    austrianStylePotatoSalad,
    avgolemonoGreekChickenAndRiceSoupWithEggAndLemon,
    bLCLCShakingBeef,
    bNCh,
    bNhXOSizzlingVietnameseCrepes,
    baconWrappedMeatloafWithBrownSugarKetchupGlaze,
    baharatSpicedBeefToppingForHummus,
    bakedBrieEnCroTe,
    bakedEggsFlorentine,
    bakedEggsForSandwiches,
    bakedManicotti,
    bakedSoleFilletsWithHerbsAndBreadCrumbs,
    bakedZiti,
    bananaMuffinsWithCoconutAndMacadamia,
    bananasFoster,
    bangersWithOnionGravy,
    barbecuedPulledChicken,
    barbecuedSalmon,
    barleySaladWithPomegranatePistachiosAndFeta,
    basicPolenta,
    bauernfrHstCkGermanFarmerSBreakfast,
    beefAndVegetableSoup,
    beefBulgogiKoreanMarinatedBeef,
    beefEmpanadas,
    beefEnCocotteWithMushroomSauce,
    beefHoFun,
    beefSatay,
    beefStirFryWithBellPeppersAndBlackPepperSauce,
    beefTenderloinWithSmokyPotatoesAndPersilladeRelish,
    beerBatteredOnionRingsWithJalapeODippingSauce,
    beetSaladWithSpicedYogurtAndWatercress,
    beetsWithLemonAndAlmonds,
    beijingStyleMeatSauceAndNoodles,
    bestBakedApples,
    bestBakedPotatoes,
    bestBananaBread,
    bestBlueberryMuffins,
    bestButtermilkWaffles,
    bestChickenParmesan,
    bestChickenStew,
    bestDropBiscuits,
    bestGrilledChickenThighs,
    bestLemonBars,
    bestOldFashionedBurgers,
    bestRoastChickenWithRootVegetables,
    bestSummerTomatoGratin,
    betterBranMuffins,
    betterChickenMarsala,
    biscuitBreakfastSandwiches,
    bittersweetChocolateRoulade,
    blackBeanBurgers,
    blackBeanSoup,
    blackOliveTapenade,
    blackenedChicken,
    blanchedGreenBeans,
    blondies,
    blueberryBoyBait,
    blueberryScones,
    boiledLobster,
    boiledPotatoesWithBlackOliveTapenade,
    bouyourdiSpicyGreekBakedFeta,
    bowTiePastaWithPesto,
    braisedChickenThighsWithFennelOrangeAndCrackedOlives,
    braisedChickenThighsWithLemonSpicesAndTornBasil,
    braisedChickenWithMustardAndHerbs,
    braisedEggplantWithPaprikaCorianderAndYogurt,
    braisedGreensWithBaconAndOnion,
    braisedHalibutWithLeeksAndMustard,
    braisedMonkfishWithSaffronAndCuredOlives,
    braisedRedPotatoesWithLemonAndChives,
    braisedTurkey,
    breadAndButterPickles,
    breadStuffingWithBaconApplesSageAndCaramelizedOnions,
    breakfastSausagePatties,
    breakfastStrataWithSpinachAndGruyRe,
    breakfastTacosScrambledEggsMigasAndCharredTortillas,
    briam,
    britishStyleCurrantScones,
    broccoliAndFetaFrittata,
    broccoliCheeseSoup,
    broccoliSaladWithCreamyAvocadoDressing,
    broiledChickenWithGravy,
    broiledPorkTenderloin,
    broiledSalmonWithMustardAndCrispDilledCrust,
    broiledSmashedZucchiniWithHerbedSourCream,
    brownRiceBowlsWithVegetablesAndSalmon,
    brownedButterBlondies,
    brusselsSproutSaladWithWarmMustardVinaigrette,
    buffaloCauliflowerBites,
    buffaloChickenSandwiches,
    buffaloWings,
    buttermilkMashedPotatoes,
    buttermilkVanillaPannaCottaWithBerriesAndHoney,
    butternutSquashRisotto,
    butterySpringVegetables,
    cCtelDeCamarNMexicanShrimpCocktail,
    cabbageAndRedPepperSaladWithLimeCuminVinaigrette,
    caldoDeSieteMaresSoupOfTheSevenSeas,
    caldoVerde,
    campanelleWithAsparagusBasilAndBalsamicGlaze,
    candiedSweetPotatoCasserole,
    caramelSauce,
    caramelizedPearsWithBlueCheeseAndBlackPepperCaramelSauce,
    carciofiAllaGiudiaRomanJewishFriedArtichokes,
    carneAsadaMexicanStyleGrilledSteak,
    carnitasMexicanPulledPork,
    carrotGingerSoup,
    castIronBakedZitiWithCharredTomatoes,
    castIronThickCutSteaksWithHerbButter,
    cataplanaPortugueseSeafoodStew,
    cauliflowerSoup,
    cavatappiWithArugulaGoatCheeseAndSunDriedTomatoPesto,
    chanaMasala,
    charcoalGrilledBarbecuedChickenKebabs,
    cheeseAndTomatoLasagna,
    cheeseSouffl,
    cheesyGarlicBread,
    chelowBaTahdigPersianStyleRiceWithGoldenCrust,
    cherryClafouti,
    cherrySauce,
    chicagoStyleDeepDishPizza,
    chickenAndDumplings,
    chickenAndSausageGumbo,
    chickenBiryani,
    chickenBouillabaisse,
    chickenCanzanese,
    chickenEnchiladasWithRedChileSauce,
    chickenFrancese,
    chickenFriedSteaks,
    chickenInMolePoblanoSauce,
    chickenMarbella,
    chickenMarsala,
    chickenPiccata,
    chickenProvenAl,
    chickenSaltimbocca,
    chickenSchnitzel,
    chickenTagine,
    chickenTeriyaki,
    chickenTikkaMasala,
    chickenUnderABrickWithHerbRoastedPotatoes,
    chickenVesuvio,
    chickenWith40ClovesOfGarlic,
    chickenYassaSenegaleseBraisedChickenWithCaramelizedOnionAndLemon,
    chileVerdeConCerdoGreenChiliWithPork,
    chiliConCarne,
    chiliCrispNoodles,
    chilledSobaNoodlesWithCucumberSnowPeasAndRadishes,
    chineseBarbecuedPork,
    chineseStyleBarbecuedSpareribs,
    chocolateHazelnutSpread,
    chocolateToffeeBark,
    chorizoAndPotatoTacos,
    chraime,
    chunkyGuacamole,
    ciambottaItalianVegetableStew,
    ciderGlazedPorkChops,
    cincinnatiChili,
    cioppino,
    classicAmericanGarlicBread,
    classicButtermilkWaffles,
    classicChickenNoodleSoup,
    classicChickenSalad,
    classicCrMeCaramel,
    classicFrenchFries,
    classicGazpacho,
    classicGreenBeanCasserole,
    classicGrilledCheeseSandwiches,
    classicIrishSodaBread,
    classicMashedPotatoes,
    classicPizzaDough,
    classicRoastLemonChicken,
    classicSloppyJoes,
    classicSpaghettiAndMeatballsForACrowd,
    classicStrawberryJam,
    classicStuffedBellPeppers,
    codBakedInFoilWithLeeksAndCarrots,
    comVietnameseRedRice,
    congeeChineseRicePorridge,
    coqAuRiesling,
    cornFritters,
    cornMuffins,
    cornRisotto,
    cornTortillas,
    crabAndShrimpStew,
    crabTowersWithAvocadoAndGazpachoSalsas,
    cranberryChutneyWithApplesAndCrystallizedGinger,
    cranberryPecanMuffins,
    creamBiscuits,
    creamScones,
    creamlessCreamyTomatoSoup,
    creamyBakedFourCheesePasta,
    creamyButtermilkColeslaw,
    creamyColeslaw,
    creamyFrenchStyleScrambledEggs,
    creamyGazpachoAndaluz,
    creamyGreenPeppercornSauce,
    creamyHerbedSpinachDip,
    creamyMashedPotatoes,
    creamyMushroomSoup,
    creamyParmesanPolenta,
    creamyPeaSoup,
    creoleStyleShrimpAndSausageGumbo,
    crepesSuzette,
    crepesWithBerriesAndApricotBeurreMont,
    crepesWithSugarAndLemon,
    crispBreadedChickenCutlets,
    crispRoastButterfliedChickenWithRosemaryAndGarlic,
    crispRoastChicken,
    crispyCacioEPepeBites,
    crispyEggplantSaladWithTomatoesHerbsAndFriedShallots,
    crispyFishSandwiches,
    crispyFriedChicken,
    crispyOnions,
    crispyOrangeBeef,
    crispyPanFriedChickenCutlets,
    crispyPanFriedPorkChops,
    crispyPotatoLatkes,
    crispyRoastedPotatoes,
    crispySaltAndPepperShrimp,
    crispySmashedPotatoes,
    crunchyBakedPorkChops,
    crunchyKettlePotatoChips,
    crunchyOvenFriedFish,
    cubanShreddedBeef,
    cubanStyleBlackBeansAndRice,
    cubanStylePicadillo,
    curryDeviledEggsWithEasyPeelHardCookedEggs,
    dakgangjeongKoreanFriedChickenWings,
    danDanMianSichuanNoodlesWithChiliSauceAndPork,
    darkChocolateFudgeSauce,
    deviledPorkChops,
    dinerStyleHomeFries,
    doChuaDaikonCarrotPickle,
    doubleGlazedSalmonWithLemonAndThyme,
    driedCherryPortSauceWithOnionsAndMarmalade,
    dryChiliChicken,
    duchessPotatoCasserole,
    duckFatRoastedPotatoes,
    easierFrenchFries,
    easierFriedChicken,
    easiestEverBiscuits,
    easyBeefTenderloinWithHarissaSpiceRubAndCilantroMintRelish,
    easyGrilledBonelessPorkChops,
    easySandwichBread,
    eggplantInvoltini,
    eggplantParmesan,
    eggsPipRade,
    enchiladasVerdes,
    espinacasConGarbanzosAndalusianSpinachAndChickpeas,
    esquitesMexicanStyleCornSalad,
    everydayFrenchToast,
    falafel,
    familySizeTomatoBaconAndGarlicOmelet,
    farfalleWithTomatoesOlivesAndFeta,
    farmhouseVegetableAndBarleySoup,
    farroSaladWithAsparagusSugarSnapPeasAndTomatoes,
    fastestEasiestMashedPotatoes,
    fattoushPitaBreadSaladWithTomatoesAndCucumber,
    favaBeansWithArtichokesAsparagusAndPeas,
    fettuccineAlfredo,
    filipinoChickenAdobo,
    fishAndChips,
    fishMeuniReWithBrownedButterAndLemon,
    flankSteakAndArugulaSandwichesWithRedOnion,
    fluffyDinnerRolls,
    fluffyMashedPotatoes,
    fluffyScrambledEggs,
    foldedEnchiladas,
    fourCheeseLasagna,
    frenchChickenInAPot,
    frenchPotatoSaladWithDijonMustardAndFinesHerbes,
    frenchStylePorkChopsWithApplesAndCalvados,
    frenchStylePorkStew,
    frenchStylePotRoastedPorkLoin,
    frenchStyleStuffedChickenBreasts,
    frenchToastCasserole,
    frenchToast,
    freshCornChowder,
    freshCornCornbread,
    freshPappardelle,
    freshPastaWithoutAMachine,
    freshSalmonBurgersWithSrirachaMayonnaise,
    friedBrownRiceWithPorkAndShrimp,
    friedRiceWithShrimpPorkAndShiitakes,
    friedShallotsAndFriedShallotOil,
    friedWholeBranzinoWithCheesyGrits,
    friedYuca,
    fromTheFreezerBlueberryCinnamonMuffins,
    fukujinzukeJapanesePicklesForCurry,
    fusilliWithRicottaAndSpinach,
    gICuNVietnameseSummerRolls,
    gNgbOJDNgSichuanKungPaoChicken,
    gTeauBretonWithApricotFilling,
    gaiYangThaiGrilledCornishGameHensWithChiliDippingSauce,
    galettesComplTesBuckwheatCrepesWithHamEggAndCheese,
    garlicCroutons,
    garlicLimeGrilledPorkTenderloinSteaks,
    garlicStuddedRoastPorkLoin,
    garlickyBroiledShrimp,
    garlickyRoastedShrimpWithParsleyAndAnise,
    garlickyShrimpPasta,
    garlickyShrimpTomatoAndWhiteBeanStew,
    garlickyShrimpWithBreadCrumbs,
    gibletPanGravyForACrowd,
    gibletPanGravy,
    gingersnaps,
    glazedAllBeefMeatloaf,
    glazedCarrots,
    glazedRoastChicken,
    glazedSalmon,
    glazedSpiralSlicedHam,
    gnocchiAllaRomanaSemolinaGnocchi,
    gnocchiLaParisienneWithArugulaTomatoesAndOlives,
    goanPorkVindaloo,
    goldenCornbread,
    gougRes,
    grahamCrackerCrust,
    grandMarnierSouffl,
    gravyForSimpleGrillRoastedTurkey,
    greekCherryTomatoSalad,
    greekSalad,
    greekStyleShrimpWithTomatoesAndFeta,
    greenBeanSaladWithCherryTomatoesAndFeta,
    greenShakshuka,
    grillRoastedBeefTenderloinForACrowd,
    grillRoastedBeefTenderloin,
    grillRoastedBeerCanChicken,
    grillRoastedBoneInPorkRoast,
    grillRoastedBonelessTurkeyBreast,
    grillRoastedCornishGameHens,
    grillRoastedPorkLoin,
    grillRoastedWholeChicken,
    grillSmokedHerbRubbedFlatIronSteaks,
    grillSmokedPorkChops,
    grillSmokedSalmon,
    grilledArayesGrilledLambStuffedPitaWithYogurtSauce,
    grilledArgentineSteaksWithChimichurri,
    grilledBabaGhanoush,
    grilledBaconWrappedScallops,
    grilledBeefKebabsWithLemonAndRosemaryMarinade,
    grilledBeefSatay,
    grilledBlackenedRedSnapper,
    grilledBonelessBeefShortRibs,
    grilledBonelessSkinlessChickenBreasts,
    grilledCauliflower,
    grilledChickenFajitas,
    grilledChickenSatay,
    grilledChickenSouvlaki,
    grilledChickenWithAdoboAndSazN,
    grilledCornWithFlavoredButter,
    grilledFishTacos,
    grilledFlankSteak,
    grilledFreshCornCornbreadWithCharredJalapeOsAndCheddar,
    grilledGlazedBabyBackRibs,
    grilledGlazedBoneInChickenBreasts,
    grilledGlazedBonelessSkinlessChickenBreasts,
    grilledGlazedPorkTenderloinRoast,
    grilledHalloumiWraps,
    grilledHamburgers,
    grilledLambKebabs,
    grilledLambKofte,
    grilledLemonChickenWithRosemary,
    grilledMarinatedFlankSteak,
    grilledMojoMarinatedSkirtSteak,
    grilledPorkChops,
    grilledPorkKebabsWithHoisinGlaze,
    grilledPorkLoinWithAppleCranberryFilling,
    grilledPorkTenderloinWithGrilledPineappleRedOnionSalsa,
    grilledPotatoesWithGarlicAndRosemary,
    grilledRackOfLamb,
    grilledRadicchio,
    grilledSalmonFillets,
    grilledScallionTopping,
    grilledScallops,
    grilledShrimpAndVegetableKebabs,
    grilledShrimpSkewers,
    grilledSouthernShrimpBurgers,
    grilledSpiceRubbedChickenDrumsticks,
    grilledSteakWithNewMexicanChileRub,
    grilledStripOrRibEyeSteaks,
    grilledStuffedChickenBreastsWithProsciuttoAndFontina,
    grilledStuffedFlankSteak,
    grilledStuffedPorkTenderloin,
    grilledSwordfishSkewersWithTomatoScallionCaponata,
    grilledTomatoAndCheesePizza,
    grilledTomatoes,
    grilledTunaSteaksWithVinaigrette,
    grilledVegetablePlatter,
    grilledWellDoneHamburgers,
    grilledWholeTroutWithMarjoramAndLemon,
    grindYourOwnSirloinBurgerBlend,
    groundBeefAndCheeseEnchiladas,
    groundBeefTacos,
    grownUpGrilledCheeseSandwichesWithCheddarAndShallots,
    guayTiewTomYumGoongThaiHotAndSourNoodleSoupWithShrimp,
    halibutLaNageWithParsnipsAndTarragon,
    harGowCrystalShrimpDumplings,
    hariraMoroccanLentilAndChickpeaSoup,
    heartyChickenNoodleSoup,
    heartyLentilSoup,
    heartyMinestrone,
    heartySpanishStyleLentilAndChorizoSoup,
    herbCrustedPorkRoast,
    herbCrustedSalmon,
    herbPoachedShrimpWithCocktailSauce,
    herbedRoastTurkey,
    highRoastButterfliedChickenWithPotatoes,
    homeFriedTacoShells,
    homeFriesForACrowd,
    honeydewSaladWithPeanutsAndLime,
    hongKongStyleWontonNoodleSoup,
    horiatikiSalataHeartyGreekSalad,
    horseradishCrustedBeefTenderloin,
    hotAndSourSoup,
    hotUkrainianBorscht,
    huevosRancheros,
    indianCurry,
    indianStyleBasmatiRice,
    indianStyleCurryWithPotatoesCauliflowerPeasAndChickpeas,
    individualFreshBerryGratinsWithZabaglione,
    indoorClambake,
    indoorPulledChicken,
    indoorPulledPorkWithSweetAndTangyBarbecueSauce,
    inexpensiveGrillRoastedBeefWithGarlicAndRosemary,
    irishBrownSodaBread,
    italianChickenSoupWithParmesanDumplings,
    italianPastaSalad,
    italianSausageWithGrapesAndBalsamicVinegar,
    italianStyleGrilledChicken,
    italianWeddingSoup,
    jamaicanPepperSteak,
    japaneseCurryRouxBricks,
    japchaeKoreanSweetPotatoStarchNoodlesWithVegetablesAndBeef,
    jerkChicken,
    juicyGrilledTurkeyBurgers,
    juicyPubStyleBurgers,
    kaleCaesarSalad,
    kaleSaladWithRadishesGrapefruitAndCandiedPepitas,
    karaageJapaneseFriedChickenThighs,
    kareRaisuJapaneseCurryRiceWithChicken,
    keemaAlooGaramMasalaSpicedGroundBeefWithPotatoes,
    keyLimeBars,
    khaoNiaowMaMuangStickyRiceWithMango,
    khuaKlingSouthernThaiPorkStirFry,
    kimchiBokkeumbapKimchiFriedRice,
    kousaMihshiLebaneseStuffedSquash,
    kungPaoShrimp,
    laoHuCaiTigerSalad,
    latinFlan,
    lbRTurkishPoachedEggsWithYogurtAndSpicedButter,
    leafyGreenSaladWithRichAndCreamyBlueCheeseDressing,
    leekFennelAndSquashSoupWithSausage,
    lentilSaladWithOlivesMintAndFeta,
    lighterChickenAndDumplings,
    lighterChickenParmesan,
    lighterCornChowder,
    linguineAlloScoglioLinguiniWithSeafood,
    luDanBraisedEggs,
    lumpiangShanghaiWithSeasonedVinegar,
    madeleines,
    mahoganyChickenThighs,
    makeAheadCheeseSoufflS,
    makeAheadChocolateSoufflS,
    makeAheadMashedPotatoes,
    mangoOrangeAndJicamaSalad,
    mapleGlazedPorkRoast,
    mapleGlazedPorkTenderloin,
    mapoTofuSichuanBraisedTofuWithBeef,
    marinaraSauce,
    mashedPotatoesAndRootVegetables,
    mashedPotatoesWithBlueCheeseAndPortCaramelizedOnions,
    mashedSweetPotatoes,
    matzoBrei,
    meatlessMeatSauceWithChickpeasAndMushrooms,
    mechouiaTunisianStyleGrilledVegetables,
    mediterraneanChoppedSalad,
    mexicanRice,
    mexicanStyleGrilledCorn,
    microwaveFriedGarlic,
    milkBraisedPorkLoin,
    millionaireSShortbread,
    misoMarinatedSalmon,
    modernCauliflowerGratin,
    modernCoqAuVin,
    modernHamAndSplitPeaSoup,
    moquecaBrazilianShrimpAndFishStew,
    moroccanFishTagine,
    muShuPork,
    mujaddaraRiceAndLentilsWithCrispyOnions,
    mulligatawnySoup,
    multicookerChickenInAPotWithLemonHerbSauce,
    multicookerHawaiianOxtailSoup,
    murghMakhaniIndianButterChicken,
    mushroomBeefBlendedBurgers,
    mushroomBisque,
    mushroomBourguignon,
    mushroomLeekBreadStuffingWithHerbs,
    mushroomRisotto,
    mustardFennelPanSauce,
    mustardyAppleButterGlazedPorkChops,
    namPrikPaoThaiChiliJam,
    nasiGorengIndonesianStyleFriedRice,
    negimakiJapaneseGrilledSteakAndScallionRolls,
    newEnglandBakedBeans,
    newEnglandClamChowder,
    newEnglandClambake,
    newEnglandFishChowder,
    newEnglandLobsterRoll,
    nextLevelChickenPiccata,
    nikujagaBeefAndPotatoStew,
    nutCrustedChickenBreastsWithLemonAndThyme,
    oatmealDinnerRolls,
    oatmealMuffins,
    oatmealScones,
    oliveOilSauceWithAnchoviesAndParsley,
    oneHourBroiledChickenAndPanSauce,
    oneHourPizza,
    orangeCranberryAndMintTopping,
    orangeFlavoredChicken,
    orecchietteWithBroccoliRabeAndSausage,
    ovenFriedChicken,
    ovenFriedOnionRings,
    ovenRoastedChickenThighs,
    ovenRoastedPorkChops,
    ovenRoastedSalmon,
    ovenSteamedFishWithScallionsAndGinger,
    ovenSteamedMussels,
    pODeQueijoBrazilianCheeseBread,
    paAmbTomQuetCatalanTomatoBread,
    padThai,
    paellaDeVerdurasCauliflowerAndBeanPaella,
    paellaOnTheGrill,
    paella,
    paiHuangGuaSmashedCucumbers,
    pakorasSouthAsianSpicedVegetableFritters,
    palakDalSpinachDalWithCuminAndMustardSeeds,
    panBagnatProvenAlTunaSandwich,
    panRoastedAsparagus,
    panRoastedChickenBreastsWithPotatoes,
    panRoastedChickenBreastsWithSageVermouthSauce,
    panRoastedCodWithGreenOliveAlmondAndOrangeRelish,
    panRoastedHalibutSteaks,
    panSearedBrinedSalmon,
    panSearedChickenBreasts,
    panSearedFiletMignon,
    panSearedFlankSteakWithMustardChiveButter,
    panSearedHalibutWithWiltedBitterSalad,
    panSearedInexpensiveSteaks,
    panSearedOvenRoastedPorkTenderloin,
    panSearedSalmonSteaks,
    panSearedScallopsWithWiltedSpinachWatercressAndOrangeSalad,
    panSearedScallops,
    panSearedSesameCrustedTunaSteaks,
    panSearedShrimpWithPeanutsBlackPepperAndLime,
    panSearedShrimp,
    panSearedSteaks,
    panSearedSwordfishSteaks,
    panSearedThickCutBonelessPorkChops,
    panSearedThickCutPorkChops,
    panSearedThickCutStripSteaks,
    panangBeefCurry,
    panisciaRedWineRisottoWithBeans,
    pannaCotta,
    panzanellaItalianBreadSalad,
    parmesanCrustedChickenCutlets,
    parmesanFarrotto,
    pastaAglioEOlioPastaWithGarlicAndOil,
    pastaAllAmatriciana,
    pastaAllaGriciaRigatoniWithPancettaAndPecorinoRomano,
    pastaAllaNorcina,
    pastaAllaNorma,
    pastaAllaTrapanesePastaWithTomatoAndAlmondPesto,
    pastaAllaZozzona,
    pastaAndFreshTomatoSauceWithGarlicAndBasil,
    pastaCacioEUovaPastaWithCheeseAndEggs,
    pastaCaprese,
    pastaECeciPastaWithChickpeas,
    pastaEFagioliItalianPastaAndBeanSoup,
    pastaEPiselliPastaAndPeas,
    pastaFrittataWithSausageAndHotPeppers,
    pastaSaladWithPesto,
    pastaWithBurstCherryTomatoSauceAndFriedCaperCrumbs,
    pastaWithCauliflowerBaconAndBreadCrumbs,
    pastaWithCreamyLemonSichuanPeppercornSauce,
    pastaWithCreamyTomatoSauce,
    pastaWithPestoPotatoesAndGreenBeans,
    pastaWithSautEdMushroomsAndThyme,
    pastaWithTomatoBaconAndOnion,
    pastelNPuertoRicanSweetPlantainAndPicadilloCasserole,
    pastitsio,
    patatasBravas,
    patatasPanaderasSpanishPotatoesWithOliveOilAndWine,
    peachCrisp,
    pearCrisp,
    pearlCouscousWithLemonMintPeasFetaAndPickledShallots,
    penneAllaVodkaPenneWithVodkaSauce,
    penneArrabbiata,
    penneWithToastedNutAndParsleyPesto,
    pepperCrustedBeefTenderloinRoast,
    pepperCrustedFiletMignon,
    pepperoniPanPizza,
    perfectPanSearedPorkTenderloinSteaks,
    perfectPoachedChickenBreasts,
    perfectRoastChicken,
    perfectRoastedRootVegetables,
    perfectScrambledEggs,
    periPeriGrilledChicken,
    peruvianArrozConPollo,
    peruvianRoastChickenWithGarlicAndLime,
    pesceAllAcquaPazzaSouthernItalianStylePoachedFish,
    phillyCheesesteaks,
    piadineItalianFlatbreads,
    pinchosMorunosSpanishGrilledPorkKebabs,
    pissaladiReProvenAlPizza,
    pitaBread,
    plovRicePilafWithBeefAndCarrots,
    poachedFishFilletsWithSherryTomatoVinaigrette,
    poachedSalmonWithHerbAndCaperVinaigrette,
    polloALaBrasaPeruvianGrillRoastedChicken,
    polloEnPepitoriaSpanishBraisedChickenWithSherryAndSaffron,
    pommesAnna,
    popovers,
    porkChopsWithVinegarAndSweetPeppers,
    porkFennelAndLemonRaguWithPappardelle,
    porkLoMein,
    porkSchnitzelBreadedPorkCutlets,
    portCherryReduction,
    portWineCherrySauce,
    potatoCasseroleWithBaconAndCaramelizedOnion,
    potatoGnocchiWithBrownedButterAndSageSauce,
    potatoRoesti,
    pouletAuVinaigreChickenWithVinegar,
    pressureCookerChickenNoodleSoup,
    pressureCookerPotRoast,
    pumpkinBread,
    pupusas,
    quesadillas,
    quicheLorraine,
    quickAllPurposeGravy,
    quickBarbecueSauce,
    quickCandiedNuts,
    quickCheeseBread,
    quickChickenFricassee,
    quickCinnamonBunsWithButtermilkIcing,
    quickCookedToughGreens,
    quickGreenBeanCasserole,
    quickRoastedAcornSquashWithBrownSugar,
    quickTaiwanesePorkRice,
    quickTomatilloSauce,
    quinoaAndVegetableStew,
    quinoaPilafWithHerbsAndLemon,
    rajasPoblanasConCremaCharredPoblanoStripsWithCream,
    raspberryCoulis,
    raspberryDiagonals,
    raspberrySquares,
    reallyGoodGarlicBread,
    redBeansAndRice,
    redChileChickenFilling,
    redLentilKibbeh,
    redLentilSoupWithWarmSpices,
    redPepperAlmondSauce,
    redSnapperCevicheWithRadishesAndOrange,
    redWineBraisedPorkChops,
    redWineOrangeSauce,
    redWinePanSauce,
    refriedBeans,
    rhodeIslandStyleFriedCalamari,
    riceAndPastaPilaf,
    riceSaladWithOrangesOlivesAndAlmonds,
    rigatoniWithTomatoesBaconAndFennel,
    roastBeefTenderloinWithCaramelizedOnionAndMushroomStuffing,
    roastBeefTenderloin,
    roastBonelessLegOfLambWithGarlicHerbAndBreadCrumbCrust,
    roastButterfliedLegOfLambWithCorianderCuminAndMustardSeeds,
    roastChickenWithCouscousRoastedRedPeppersAndBasil,
    roastChickenWithWarmBreadSalad,
    roastFreshHam,
    roastRackOfLambWithRoastedRedPepperRelish,
    roastedAndGlazedChickenWings,
    roastedBoneInChickenBreasts,
    roastedBroccoli,
    roastedBrusselsSprouts,
    roastedButternutSquashWithBrownedButterAndHazelnuts,
    roastedCarrots,
    roastedCornishGameHens,
    roastedFennel,
    roastedFingerlingPotatoesWithMixedHerbs,
    roastedGarlicSalsaVerde,
    roastedGreenBeans,
    roastedMushroomsWithParmesanAndPineNuts,
    roastedOkra,
    roastedOystersOnTheHalfShellWithMustardButter,
    roastedPoblanoAndBlackBeanEnchiladas,
    roastedRadishesWithYogurtTahiniSauce,
    roastedWholeSideOfSalmon,
    rootVegetableGratin,
    rosticcianaTuscanGrilledPorkRibs,
    rusticBreadStuffingWithCranberriesAndWalnuts,
    rusticPotatoLeekSoup,
    saagPaneerIndianStyleSpinachWithFreshCheese,
    saladWithHerbedBakedGoatCheeseAndVinaigrette,
    saladeLyonnaise,
    salsaRoja,
    saltBakedPotatoesWithRoastedGarlicAndRosemaryButter,
    sanBeiJiThreeCupChicken,
    sauceBaseForSteakDiane,
    sauceBase,
    saumonAuxLentillesPanSearedSalmonWithBraisedLentillesDuPuy,
    sausageMeatballsAndSpaghetti,
    sautEdBabySpinachWithAlmondsAndGoldenRaisins,
    sautEdChickenCutletsWithMustardCiderSauceChickenPaillard,
    sautEdGarlicLemonSpinach,
    sautEdMushroomsWithRedWineAndRosemary,
    sautEdPorkCutletsWithMustardCiderSauce,
    sautEdTilapiaWithChiveLemonMisoButter,
    sautEdWildMushrooms,
    savoryCornMuffins,
    scallopedPotatoes,
    scrambledEggsWithAsparagusSmokedSalmonAndChives,
    scrambledEggsWithPintoBeansAndCotijaCheese,
    scrambledEggsWithSausageSweetPepperAndCheddarCheese,
    scrambledEggsWithShiitakeMushroomsAndFetaCheese,
    sesameBalls,
    sesameCrustedSalmonWithLemonAndGinger,
    sesameLemonCucumberSalad,
    sesameNoodlesWithShreddedChicken,
    shZiTULionSHeadMeatballs,
    shakshukaEggsInSpicyTomatoAndRoastedRedPepperSauce,
    shavedCelerySaladWithPomegranateHoneyVinaigrette,
    shrimpCocktail,
    shrimpFraDiavoloWithLinguine,
    shrimpFraDiavolo,
    shrimpPadThai,
    shrimpRisotto,
    shrimpSalad,
    shrimpScampi,
    shrimpTempura,
    shuMaiSteamedChineseDumplings,
    sichuanStirFriedPorkInGarlicSauce,
    silkyButternutSquashSoup,
    silkyRoastedEggplantWithTomatoAndFeta,
    simpleBeefChiliWithKidneyBeans,
    simpleCheeseQuiche,
    simpleGrillRoastedTurkey,
    simpleItalianStyleMeatSauce,
    simpleLasagnaWithHeartyTomatoMeatSauce,
    simpleRaspberryGratin,
    simpleRicePilaf,
    simpleSautEdSwissChard,
    simpleShrimpScampi,
    simplifiedPotatoGalette,
    singaporeNoodles,
    skilletAppleBrownBetty,
    skilletAppleCrisp,
    skilletBakedZiti,
    skilletBarbecuedPorkChops,
    skilletBeefStroganoff,
    skilletCharredGreenBeansWithCrispyBreadCrumbTopping,
    skilletChickenAndRiceWithPeasAndScallions,
    skilletChickenBroccoliAndZiti,
    skilletChickenFajitas,
    skilletJambalaya,
    skilletLasagna,
    skilletLemonSouffl,
    skilletRoastedBroccoli,
    skilletRoastedBrusselsSproutsWithLemonAndPecorinoRomano,
    skilletRoastedChickenInLemonSauce,
    skilletRoastedPotatoes,
    skilletTurkeyBurgers,
    slowCookedWholeCarrots,
    slowCookerPorkLoinWithCranberriesAndOrange,
    slowRoastedChickenPartsWithShallotGarlicPanSauce,
    smashedPotatoes,
    smokedChicken,
    smotheredPorkChops,
    snickerdoodles,
    soeupaAllaValpellinentzeSavoyCabbageSoupWithHamRyeBreadAndFontina,
    soupeAuPistouProvenAlVegetableSoup,
    sousVideBonelessThickCutPorkChops,
    sousVidePerfectSearedSteaks,
    southernCornFritters,
    southernStyleCornbread,
    spaghettiAlLimoneSpaghettiWithLemonAndOliveOil,
    spaghettiAllAssassina,
    spaghettiAllaCarbonara,
    spaghettiAndMeatballs,
    spaghettiCacioEPepeSpaghettiWithPecorinoRomanoAndBlackPepper,
    spaghettiWithMushroomAndTomatoSauceQuickMushroomRagu,
    spaghettiWithOlivePesto,
    spanishMigasWithFriedEggs,
    spanishStyleGarlicShrimp,
    spanishStyleToastedPastaWithShrimp,
    spanishTortillaWithRoastedRedPeppersAndPeas,
    spiceRubbedPicnicChicken,
    spiceRubbedPorkRoastEnCocotteWithCaramelizedOnions,
    spicyMayonnaise,
    spicyMexicanShreddedPorkTostadas,
    spinachAndRicottaGnudiWithTomatoButterSauce,
    spinachLasagna,
    springVegetablePasta,
    steakAuPoivreWithBrandiedCreamSauce,
    steakFajitas,
    steakFries,
    steakFrites,
    steakTacos,
    steakTipsWithMushroomOnionGravy,
    stirFriedAsparagusWithShiitakeMushrooms,
    stirFriedBeefAndBroccoliWithOysterSauce,
    stirFriedBeefAndGaiLan,
    stirFriedCuminBeef,
    stirFriedPorkEggplantAndOnionWithGarlicAndBlackPepper,
    stirFriedPortobellosWithGingerOysterSauce,
    stirFriedShrimpWithSnowPeasAndRedBellPepperInHotAndSourSauce,
    stirFriedThaiStyleBeefWithChilesAndShallots,
    stirFriedTofuSnowPeasAndRedOnionWithHotAndSourSauce,
    stovetopRoastChickenWithLemonHerbSauce,
    strawberryTopping,
    streamlinedFrenchOnionSoup,
    struffoliNeapolitanHoneyBalls,
    stuffedChickenCutletsWithHamAndCheddar,
    stuffedPorkChops,
    stuffedRoastButterfliedChicken,
    suanLaBaiCaiSourAndHotNapaCabbage,
    succotashWithButterBeansCornAndRedPepper,
    summerPastaPuttanesca,
    summerVegetableGratin,
    sungChoyBaoChineseChickenLettuceWraps,
    superGreensSoupWithLemonTarragonCream,
    sweetAndSaucyGrilledSalmonWithLimeJalapeOGlaze,
    sweetAndTangyBarbecuedChicken,
    sweetAndTangyGrilledCountryStylePorkRibs,
    sweetAndTangyOvenBarbecuedChicken,
    sweetPotatoSoup,
    swissChardAndKaleGratin,
    tabbouleh,
    tacosAlCarbNGrilledSteakTacos,
    tacosDoradosCrispyGroundBeefTacos,
    tacosGobernador,
    tagliatelleWithProsciuttoAndPeas,
    tandooriChicken,
    tandooriSalmon,
    tangerineAndGingerRelish,
    tenMinuteSteelCutOatmeal,
    tenderJuicyGrilledBurgers,
    teriyakiStirFriedBeefWithGreenBeansAndShiitakes,
    thaiChickenCurryWithPotatoesAndPeanuts,
    thaiChickenSoup,
    thaiGreenCurryWithChickenBroccoliAndMushrooms,
    thaiGrilledBeefSalad,
    thaiPorkLettuceWraps,
    thaiStyleChickenWithBasil,
    thaiStyleGrilledChickenWithSpicySweetAndSourDippingSauce,
    thaiStyleStirFriedNoodlesWithChickenAndBroccolini,
    thickCutOvenFries,
    thickCutPorkTenderloinMedallions,
    thickCutSweetPotatoFries,
    thymeSherryVinegarPanSauce,
    tingaDePolloShreddedChickenTacos,
    tiramisu,
    tonkatsuJapaneseFriedPorkChops,
    tortaCaprese,
    tortillaSoup,
    tripleMushroomPasta,
    turkeyBreastEnCocotteWithPanGravy,
    turkeyGravyForJuliaChildSStuffedTurkeyUpdated,
    turkeyMeatloafWithKetchupBrownSugarGlaze,
    turkeyPattyMelts,
    turkeySausageLasagna,
    turkeyTetrazzini,
    twiceBakedPotatoes,
    ultimateBananaBread,
    ultimateCreamOfTomatoSoup,
    ultimateFlakyButtermilkBiscuits,
    ultimateGreenBeanCasserole,
    ultimateVeggieBurgers,
    ultracreamyHummus,
    ultranuttyPecanBars,
    veganBajaStyleCauliflowerTacos,
    veganPintoBeanBeetBurgers,
    vegetableBibimbapWithNurungji,
    vegetableLasagna,
    vietnameseBeefPho,
    vietnameseStyleCaramelChickenWithBroccoli,
    vospovKofteRedLentilKofte,
    walkawayRatatouille,
    warmSpicedPecansWithRumGlaze,
    weeknightPastaBolognese,
    weeknightRoastChicken,
    weeknightTagliatelleWithBologneseSauce,
    whiteBeanAndMushroomGratin,
    whiteChickenChili,
    wildRiceAndMushroomSoup,
    wildRicePilafWithPecansAndDriedCranberries,
    wiltedSpinachSaladWithWarmBaconDressing,
    yeastedWaffles,
    zaaloukMoroccanEggplantMeze,
    zarzuelaSpanishSeafoodStew,
    zhaPaiguTaiwaneseFriedPorkChops,
    zucchiniBread,
    almostNoKneadBread,
    almostNoKneadSourdoughBread,
    authenticBaguettesAtHome,
    bakedAlaska,
    bakedBreadStuffingWithSausageDriedCherriesAndPecans,
    baklava,
    barbecuedBabyBackRibs,
    barbecuedPulledPork,
    barbecuedWholeBeefBrisketWithSpicyChiliRub,
    beefBraisedInBarolo,
    beefBurgundy,
    beefShortRibRagu,
    beefTopLoinRoastWithPotatoes,
    beefWellington,
    bestBeefStew,
    bestFrenchOnionSoup,
    bestGroundBeefChili,
    bestPrimeRib,
    bestShortbread,
    bestVegetarianChili,
    bostonBakedBeans,
    bostonBrownBread,
    braciole,
    braisedBeefShortRibs,
    braisedBrisketWithPomegranateCuminAndCilantro,
    braisedCollardGreens,
    braisedLambShanksWithRedWineAndHerbesDeProvence,
    braisedOxtailsWithWhiteBeansTomatoesAndAleppoPepper,
    bretonKouignAmann,
    caramelEspressoYuleLog,
    carbonnadeLaFlamande,
    carneAdovadaBraisedNewMexicoStylePorkInRedChileSauce,
    carneDeshebradaShreddedBeefTacos,
    castIronPanPizza,
    catalanStyleBeefStewWithMushrooms,
    challah,
    chickenBroth,
    chickenKyiv,
    chinesePorkDumplings,
    chocolateRaspberryTorte,
    chouxAuCraquelin,
    ciabatta,
    cinnamonSwirlBread,
    classicCrMeBrLE,
    classicRoastStuffedTurkey,
    classicRoastTurkey,
    crescentShapedRugelachWithRaisinWalnutFilling,
    crispSkinHighRoastButterfliedTurkeyWithSausageDressing,
    crispySlowRoastedPorkBelly,
    croissants,
    daubeProvenAl,
    deepDishPizza,
    deliRyeBread,
    diyChiliOil,
    drunkenBeans,
    easierRoastTurkeyAndGravy,
    etonMess,
    fennelCorianderTopSirloinRoast,
    fettuccineWithBologneseSauce,
    fougasse,
    frenchStyleChickenAndStuffingInAPot,
    frozenYogurt,
    glazedBonelessBeefShortRibs,
    gravlax,
    grillRoastedBeefShortRibs,
    grillRoastedTurkey,
    guaBaoTaiwaneseSteamedBunsWithBraisedPorkBelly,
    hNgShONiRUChineseBraisedBeef,
    handRolledMeatRavioli,
    heartyBeefAndVegetableStew,
    heartyHamAndSplitPeaSoupWithPotatoes,
    heartyTuscanBeanStew,
    homeCornedBeefWithVegetables,
    homemadeNaan,
    hungarianBeefStew,
    irishStewWithCarrotsAndTurnips,
    jamaicanStewPeasWithSpinners,
    juliaChildSStuffedTurkeyUpdated,
    kanelbullarSwedishCinnamonBuns,
    kansasCityStickyRibs,
    lahmajunArmenianFlatbread,
    lambBarbacoa,
    laugenbrezelnGermanLyePretzels,
    lemonPossetWithBerries,
    liGeWaffles,
    linzertorte,
    maAmoul,
    makeAheadTurkeyGravy,
    makeWayAheadDinnerRolls,
    memphisStyleBarbecuedSpareribs,
    modernBeefBurgundy,
    moussaka,
    multigrainBread,
    mushroomAndLeekGaletteWithGorgonzola,
    newEnglandStyleHomeCornedBeefAndCabbage,
    newYorkBagels,
    noKneadBrioche,
    oldFashionedPotRoast,
    oldFashionedStuffedTurkey,
    onionBraisedBeefBrisket,
    ossoBuco,
    ourFavoriteChili,
    ovenBarbecuedSpareribs,
    paneFrancese,
    pappardelleWithDuckAndChestnutRagu,
    parisBrest,
    pastaWithHeartyItalianMeatSauceSundayGravy,
    pastaWithRusticSlowSimmeredTomatoSauceWithMeat,
    pavlovaWithFruitAndWhippedCream,
    piciAllaBoscaiolaHandmadePastaWithMushroomsAndSausage,
    pizzaAlTaglioWithArugulaAndFreshMozzarella,
    pizzaBianca,
    porchettaStyleTurkeyBreast,
    porchetta,
    potRoastWithRootVegetables,
    profiteroles,
    raguAllaBolognese,
    raspberryCharlotte,
    redPepperCoques,
    rigatoniWithBeefAndOnionRagu,
    roastSaltedTurkey,
    roastTurkeyAndGravyWithHerbesDeProvenceAndLemon,
    roastTurkeyForACrowd,
    roastWholeTurkeyBreastWithGravy,
    roastedBrinedTurkey,
    ropaViejaCubanBraisedAndShreddedBeef,
    rosemaryFocaccia,
    rusticCountryBread,
    rusticDinnerRolls,
    simplePotAuFeu,
    simplePotRoast,
    simplifiedCassouletWithPorkAndKielbasa,
    slowCookerBeefBurgundy,
    slowCookerBeerBraisedShortRibs,
    slowCookerOldFashionedChickenNoodleSoup,
    slowRoastedBeef,
    slowRoastedBoneInPorkRibRoast,
    slowRoastedPorkShoulderWithPeachSauce,
    slowRoastedTurkeyWithGravy,
    smokyPulledPorkOnAGasGrill,
    sousVideCochinitaPibil,
    sousVideCrMeBrLE,
    sousVidePrimeRib,
    sousVideRosemaryMustardSeedCrustedRoastBeef,
    spiralSlicedHamWithCiderVinegarCaramel,
    stickyBunsWithPecans,
    stollen,
    stuffedSpatchcockedTurkey,
    tacosAlPastorSpicyPorkTacos,
    tamales,
    texasStyleBarbecuedBeefRibs,
    theBestGlutenFreePizza,
    thickCrustSicilianStylePizza,
    thinCrustPizza,
    thinCrustWholeWheatPizzaWithGarlicOilThreeCheesesAndBasil,
    turkeyAndGravyForACrowd,
    turkeyThighConfitWithCitrusMustardSauce,
    tuscanStyleBeefStew,
    ultimateGrilledPizza,
    ultimateStickyBuns,
    wholeWheatSandwichBread,
    zaAtarFingerBread
  ];
  return recipes;
};

export const mvpRecipeCatalog: Recipe[] = buildCatalog();

/**
 * Export by time band for easy filtering
 */
export const fastRecipes = mvpRecipeCatalog.filter(r => r.metadata.timeBand === 'FAST');
export const normalRecipes = mvpRecipeCatalog.filter(r => r.metadata.timeBand === 'NORMAL');
export const projectRecipes = mvpRecipeCatalog.filter(r => r.metadata.timeBand === 'PROJECT');

/**
 * Export by tag for persona-based recommendations
 */
export const budgetFriendlyRecipes = mvpRecipeCatalog.filter(r => r.tags?.includes('budget_friendly'));
export const comfortFoodRecipes = mvpRecipeCatalog.filter(r => r.tags?.includes('comfort_food'));
export const weeknightRecipes = mvpRecipeCatalog.filter(r => r.tags?.includes('weeknight'));
export const mealPrepRecipes = mvpRecipeCatalog.filter(r => r.tags?.includes('meal_prep'));
export const makeAheadRecipes = mvpRecipeCatalog.filter(r => r.tags?.includes('make_ahead'));

// Legacy exports for existing code compatibility
export const allRecipes = mvpRecipeCatalog;
export const seedRecipes = mvpRecipeCatalog;
