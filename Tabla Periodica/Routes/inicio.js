const express = require("express");
const routes= express.Router();
const path = require('path');

const elementos = [
  // No metales
  {id:"1", simbolo: "H", grupo: "otros-no-metales", bloque:"S", posicion: [1, 1] },//1
  {id:"2", simbolo: "C", grupo: "otros-no-metales", bloque:"P", posicion: [2, 14] },//2
  {id:"3", simbolo: "N", grupo: "otros-no-metales", bloque:"P", posicion: [2, 15] },//3
  {id:"4", simbolo: "O", grupo: "otros-no-metales", bloque:"P", posicion: [2, 16] },//4
  {id:"5", simbolo: "P", grupo: "otros-no-metales", bloque:"P", posicion: [3, 15] },//5
  {id:"6", simbolo: "S", grupo: "otros-no-metales", bloque:"P", posicion: [3, 16] },//6
  {id:"7", simbolo: "Se", grupo: "otros-no-metales", bloque:"P", posicion: [4, 16] },//7

  // Halógenos
  {id:"8", simbolo: "F", grupo: "halogeno", bloque:"P", posicion: [2, 17] },//8-1
  {id:"9", simbolo: "Cl", grupo: "halogeno", bloque:"P", posicion: [3, 17] },//9-2
  {id:"10", simbolo: "Br", grupo: "halogeno", bloque:"P", posicion: [4, 17] },//10-3
  {id:"11", simbolo: "I", grupo: "halogeno", bloque:"P", posicion: [5, 17] },//11-4
  {id:"12", simbolo: "At", grupo: "halogeno", bloque:"P", posicion: [6, 17] },//12-5
  {id:"13", simbolo: "Ts", grupo: "halogeno", bloque:"P", posicion: [7, 17] },//13-6

  // Gases nobles
  {id:"14", simbolo: "He", grupo: "gas-noble", bloque:"S", posicion: [1, 18] },//14-1
  {id:"15", simbolo: "Ne", grupo: "gas-noble", bloque:"P", posicion: [2, 18] },//15-2
  {id:"16", simbolo: "Ar", grupo: "gas-noble", bloque:"P", posicion: [3, 18] },//16-3
  {id:"17", simbolo: "Kr", grupo: "gas-noble", bloque:"P", posicion: [4, 18] },//17-4
  {id:"18", simbolo: "Xe", grupo: "gas-noble", bloque:"P", posicion: [5, 18] },//18-5
  {id:"19", simbolo: "Rn", grupo: "gas-noble", bloque:"P", posicion: [6, 18] },//19-6
  {id:"20", simbolo: "Og", grupo: "gas-noble", bloque:"P", posicion: [7, 18] },//20-7

  // Metales alcalinos
  {id:"21", simbolo: "Li", grupo: "metal-alcalino", bloque:"S", posicion: [2, 1] },//21-1
  {id:"22", simbolo: "Na", grupo: "metal-alcalino", bloque:"S", posicion: [3, 1] },//22-2
  {id:"23", simbolo: "K", grupo: "metal-alcalino", bloque:"S", posicion: [4, 1] },//23-3
  {id:"24", simbolo: "Rb", grupo: "metal-alcalino", bloque:"S", posicion: [5, 1] },//24-4
  {id:"25", simbolo: "Cs", grupo: "metal-alcalino", bloque:"S", posicion: [6, 1] },//25-5
  {id:"26", simbolo: "Fr", grupo: "metal-alcalino", bloque:"S", posicion: [7, 1] },//26/6

  // Metales alcalinotérreos
  {id:"27", simbolo: "Be", grupo: "metal-alcalinoterreo", bloque:"S", posicion: [2, 2] },//27-1
  {id:"28", simbolo: "Mg", grupo: "metal-alcalinoterreo", bloque:"S", posicion: [3, 2] },//28-2
  {id:"29", simbolo: "Ca", grupo: "metal-alcalinoterreo", bloque:"S", posicion: [4, 2] },//29-3
  {id:"30", simbolo: "Sr", grupo: "metal-alcalinoterreo", bloque:"S", posicion: [5, 2] },//30-4
  {id:"31", simbolo: "Ba", grupo: "metal-alcalinoterreo", bloque:"S", posicion: [6, 2] },//31-5
  {id:"32", simbolo: "Ra", grupo: "metal-alcalinoterreo", bloque:"S", posicion: [7, 2] },//32-6

  // Metales de transición/bloque D
  {id:"33", simbolo: "Sc", grupo: "metal-de-transicion", bloque:"D", posicion: [4, 3] },//33-1
  {id:"34", simbolo: "Ti", grupo: "metal-de-transicion", bloque:"D", posicion: [4, 4] },//34-2
  {id:"35", simbolo: "V", grupo: "metal-de-transicion", bloque:"D", posicion: [4, 5] },//35-3
  {id:"36", simbolo: "Cr", grupo: "metal-de-transicion", bloque:"D", posicion: [4, 6] },//36-4
  {id:"37", simbolo: "Mn", grupo: "metal-de-transicion", bloque:"D", posicion: [4, 7] },//37-5
  {id:"38", simbolo: "Fe", grupo: "metal-de-transicion", bloque:"D", posicion: [4, 8] },//38-6
  {id:"39", simbolo: "Co", grupo: "metal-de-transicion", bloque:"D", posicion: [4, 9] },//39-7
  {id:"40", simbolo: "Ni", grupo: "metal-de-transicion", bloque:"D", posicion: [4, 10] },//40-8
  {id:"41", simbolo: "Cu", grupo: "metal-de-transicion", bloque:"D", posicion: [4, 11] },//41-9
  {id:"42", simbolo: "Zn", grupo: "metal-de-transicion", bloque:"D", posicion: [4, 12] },//42-10
  {id:"43", simbolo: "Y", grupo: "metal-de-transicion", bloque:"D", posicion: [5, 3] },//43-11
  {id:"44", simbolo: "Zr", grupo: "metal-de-transicion", bloque:"D", posicion: [5, 4] },//44-12
  {id:"45", simbolo: "Nb", grupo: "metal-de-transicion", bloque:"D", posicion: [5, 5] },//45-13
  {id:"46", simbolo: "Mo", grupo: "metal-de-transicion", bloque:"D", posicion: [5, 6] },//46-14
  {id:"47", simbolo: "Tc", grupo: "metal-de-transicion", bloque:"D", posicion: [5, 7] },//47-15
  {id:"48", simbolo: "Ru", grupo: "metal-de-transicion", bloque:"D", posicion: [5, 8] },//48-16
  {id:"49", simbolo: "Rh", grupo: "metal-de-transicion", bloque:"D", posicion: [5, 9] },//49-17
  {id:"50", simbolo: "Pd", grupo: "metal-de-transicion", bloque:"D", posicion: [5, 10] },//50-18
  {id:"51", simbolo: "Ag", grupo: "metal-de-transicion", bloque:"D", posicion: [5, 11] },//51-19
  {id:"52", simbolo: "Cd", grupo: "metal-de-transicion", bloque:"D", posicion: [5, 12] },//52-20---
  {id:"53", simbolo: "Hf", grupo: "metal-de-transicion", bloque:"D", posicion: [6, 4] },//53-21
  {id:"54", simbolo: "Ta", grupo: "metal-de-transicion", bloque:"D", posicion: [6, 5] },//54-22
  {id:"55", simbolo: "W", grupo: "metal-de-transicion", bloque:"D", posicion: [6, 6] },//55-23
  {id:"56", simbolo: "Re", grupo: "metal-de-transicion", bloque:"D", posicion: [6, 7] },//56-24
  {id:"57", simbolo: "Os", grupo: "metal-de-transicion", bloque:"D", posicion: [6, 8] },//57-25
  {id:"58", simbolo: "Ir", grupo: "metal-de-transicion", bloque:"D", posicion: [6, 9] },//58-26
  {id:"59", simbolo: "Pt", grupo: "metal-de-transicion", bloque:"D", posicion: [6, 10] },//59-27
  {id:"60", simbolo: "Au", grupo: "metal-de-transicion", bloque:"D", posicion: [6, 11] },//60-28
  {id:"61", simbolo: "Hg", grupo: "metal-de-transicion", bloque:"D", posicion: [6, 12] },//61-29
  {id:"62", simbolo: "Rf", grupo: "metal-de-transicion", bloque:"D", posicion: [7, 4] },//62-30
  {id:"63", simbolo: "Db", grupo: "metal-de-transicion", bloque:"D", posicion: [7, 5] },//63-31
  {id:"64", simbolo: "Sg", grupo: "metal-de-transicion", bloque:"D", posicion: [7, 6] },//64-32
  {id:"65", simbolo: "Bh", grupo: "metal-de-transicion", bloque:"D", posicion: [7, 7] },//65-33
  {id:"66", simbolo: "Hs", grupo: "metal-de-transicion", bloque:"D", posicion: [7, 8] },//66-34
  {id:"67", simbolo: "Mt", grupo: "metal-de-transicion", bloque:"D", posicion: [7, 9] },//67-35
  {id:"68", simbolo: "Ds", grupo: "metal-de-transicion", bloque:"D", posicion: [7, 10] },//68-36
  {id:"69", simbolo: "Rg", grupo: "metal-de-transicion", bloque:"D", posicion: [7, 11] },//69-37
  {id:"70", simbolo: "Cn", grupo: "metal-de-transicion", bloque:"D", posicion: [7, 12] },//70-38

  // Lantánidos  
  {id:"71", simbolo: "La", grupo: "lantanido", bloque:"F", posicion: [9, 4] },//71-1
  {id:"72", simbolo: "Ce", grupo: "lantanido", bloque:"F", posicion: [9, 5] },//72-2
  {id:"73", simbolo: "Pr", grupo: "lantanido", bloque:"F", posicion: [9, 6] },//73-3
  {id:"74", simbolo: "Nd", grupo: "lantanido", bloque:"F", posicion: [9, 7] },//74-4
  {id:"75", simbolo: "Pm", grupo: "lantanido", bloque:"F", posicion: [9, 8] },//75-5
  {id:"76", simbolo: "Sm", grupo: "lantanido", bloque:"F", posicion: [9, 9] },//76-6
  {id:"77", simbolo: "Eu", grupo: "lantanido", bloque:"F", posicion: [9, 10] },//77-7
  {id:"78", simbolo: "Gd", grupo: "lantanido", bloque:"F", posicion: [9, 11] },//78-8
  {id:"79", simbolo: "Tb", grupo: "lantanido", bloque:"F", posicion: [9, 12] },//79-9
  {id:"80", simbolo: "Dy", grupo: "lantanido", bloque:"F", posicion: [9, 13] },//80-10
  {id:"81", simbolo: "Ho", grupo: "lantanido", bloque:"F", posicion: [9, 14] },//81-11
  {id:"82", simbolo: "Er", grupo: "lantanido", bloque:"F", posicion: [9, 15] },//82-12
  {id:"83", simbolo: "Tm", grupo: "lantanido", bloque:"F", posicion: [9, 16] },//83-13
  {id:"84", simbolo: "Yb", grupo: "lantanido", bloque:"F", posicion: [9, 17] },//84-14
  {id:"85", simbolo: "Lu", grupo: "lantanido", bloque:"F", posicion: [9, 18] },//85-15
  {id:"86",simbolo: "La-Lu", grupo:"lantanido", bloque:"D", posicion: [6, 3]},//86-16--

  // Actínidos
  {id:"87", simbolo: "Ac", grupo: "actinido", bloque:"F", posicion: [10, 4] },//87-1
  {id:"88", simbolo: "Th", grupo: "actinido", bloque:"F", posicion: [10, 5] },//88-2
  {id:"89", simbolo: "Pa", grupo: "actinido", bloque:"F", posicion: [10, 6] },//89-3
  {id:"90", simbolo: "U", grupo: "actinido", bloque:"F", posicion: [10, 7] },//90-4
  {id:"91", simbolo: "Np", grupo: "actinido", bloque:"F", posicion: [10, 8] },//91-5
  {id:"92", simbolo: "Pu", grupo: "actinido", bloque:"F", posicion: [10, 9] },//92-6
  {id:"93", simbolo: "Am", grupo: "actinido", bloque:"F", posicion: [10, 10] },//93-7
  {id:"94", simbolo: "Cm", grupo: "actinido", bloque:"F", posicion: [10, 11] },//94-8
  {id:"95", simbolo: "Bk", grupo: "actinido", bloque:"F", posicion: [10, 12] },//95-9
  {id:"96", simbolo: "Cf", grupo: "actinido", bloque:"F", posicion: [10, 13] },//96-10
  {id:"97", simbolo: "Es", grupo: "actinido", bloque:"F", posicion: [10, 14] },//97-11
  {id:"98", simbolo: "Fm", grupo: "actinido", bloque:"F", posicion: [10, 15] },//98-12
  {id:"99", simbolo: "Md", grupo: "actinido", bloque:"F", posicion: [10, 16] },//99-13
  {id:"100", simbolo: "No", grupo: "actinido", bloque:"F", posicion: [10, 17] },//100-14
  {id:"101", simbolo: "Lr", grupo: "actinido", bloque:"F", posicion: [10, 18] },//101-15
  {id:"102",simbolo: "Ac-Lr", grupo:"actinido", bloque:"D", posicion: [7, 3]},//102-16

  // Metaloides
  {id:"103", simbolo: "B", grupo: "metaloide", bloque:"P", posicion: [2, 13] },//103-1
  {id:"104", simbolo: "Si", grupo: "metaloide", bloque:"P", posicion: [3, 14] },//104-2
  {id:"105", simbolo: "Ge", grupo: "metaloide", bloque:"P", posicion: [4, 14] },//105-3
  {id:"106", simbolo: "As", grupo: "metaloide", bloque:"P", posicion: [4, 15] },//106-4
  {id:"107", simbolo: "Sb", grupo: "metaloide", bloque:"P", posicion: [5, 15] },//107-5
  {id:"108", simbolo: "Te", grupo: "metaloide", bloque:"P", posicion: [5, 16] },//108-6
  {id:"109", simbolo: "Po", grupo: "metaloide", bloque:"P", posicion: [6, 16] },//109-7

  // Otros metales
  {id:"110", simbolo: "Al", grupo: "otro-metal", bloque:"P", posicion: [3, 13] },//110-1
  {id:"111", simbolo: "Ga", grupo: "otro-metal", bloque:"P", posicion: [4, 13] },//111-2
  {id:"112", simbolo: "In", grupo: "otro-metal", bloque:"P", posicion: [5, 13] },//112-3
  {id:"113", simbolo: "Sn", grupo: "otro-metal", bloque:"P", posicion: [5, 14] },//114-5
  {id:"114", simbolo: "Tl", grupo: "otro-metal", bloque:"P", posicion: [6, 13] },//113-4
  {id:"115", simbolo: "Pb", grupo: "otro-metal", bloque:"P", posicion: [6, 14] },//115-6
  {id:"116", simbolo: "Bi", grupo: "otro-metal", bloque:"P", posicion: [6, 15] },//116-7
  {id:"117", simbolo: "Nh", grupo: "otro-metal", bloque:"P", posicion: [7, 13] },//117-8
  {id:"118", simbolo: "Fl", grupo: "otro-metal", bloque:"P", posicion: [7, 14] },//118-9
  {id:"119", simbolo: "Mc", grupo: "otro-metal", bloque:"P", posicion: [7, 15] },//119-10
  {id:"120", simbolo: "Lv", grupo: "otro-metal", bloque:"P", posicion: [7, 16] }//120-11 menos 2
];

const tablaColores = [
  
  { nombre:"Alcalinos", grupo: "metal-alcalino"},
  { nombre:"Alcalinoterros", grupo: "metal-alcalinoterreo"},
  { nombre:"Metales de Transcion", grupo: "metal-de-transicion"}, 
  { nombre:"Lantanidos", grupo: "lantanido"},
  { nombre:"Actinidos", grupo: "actinido"}, 
  { nombre:"Otros Metales",grupo: "otro-metal"},  
  { nombre:"Metaloide", grupo: "metaloide"},
  { nombre:"Otros No Metales",grupo: "otros-no-metales"},
  { nombre:"Halogenos", grupo: "halogeno"},
  { nombre:"Gases Nobles",grupo: "gas-noble"}
    
];

routes.get("/", function(req, res,next)  {
  res.render(path.join(__dirname + '/../Views/Inicio.hbs'),{layout: false , elementos: elementos ,tablaColores: tablaColores});
});

module.exports = routes;
