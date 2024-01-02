export const config = {
  tesco: {
    url: "https://tesco.sk/akciove-ponuky/akciove-produkty/?limit=2000",
  },
  kaufland: {
    url: "https://www.kaufland.sk/aktualna-ponuka/aktualny-tyzden/akciove-vyrobky.category=",
    paths: [
      "01_Mäso__hydina__údeniny.html",
      "02_Čerstvé_ryby.html",
      "01a_Čerstvé_ovocie_a_zelenina__Kvety.html",
      "03_Čerstvé_výrobky.html",
      "04_Mrazené_výrobky.html",
      "05_Lahôdky.html",
      "06_Trvanlivé_potraviny.html",
      "06a_Pečivo.html",
      "07_Káva__čaj__sladké__slané.html",
      "08_Nápoje.html",
      "09_Drogéria__Potrava_pre_zvieratá.html",
      "10_Elektro__kancelária__médiá.html",
      "11_Dom__domácnosť.html",
      "12_Oblečenie__auto__voľný_čas__hry.html",
    ],
  },
  //urlcky pre kazdu sekciu zliav a iterovat nimi
  lidl: {
    sections: [
      // "https://www.lidl.sk/c/cerstve-maso-a-ryby/a10015797?channel=store&tabCode=Current_Sales_Week",
      "https://www.lidl.sk/c/cerstve-maso-a-ryby/a10014810?channel=store&tabCode=Current_Sales_Week",
      "https://www.lidl.sk/c/ovocie-a-zelenina/a10014339?channel=store&tabCode=Current_Sales_Week",
      "https://www.lidl.sk/c/priamo-z-pece/a10014805?channel=store&tabCode=Current_Sales_Week",
      // "https://www.lidl.sk/c/kupony-lidl-plus/a10009680?channel=store&tabCode=Current_Sales_Week",
      // "https://www.lidl.sk/c/cenove-hity/a10015738?channel=store&tabCode=Current_Sales_Week",
    ],
  },
};
