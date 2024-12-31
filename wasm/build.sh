em++ main.cpp -o main.js -s EXPORTED_FUNCTIONS="['_add']" -s SINGLE_FILE=1 -s MODULARIZE=1 -s "EXPORT_NAME='createModule'" -s EXPORTED_RUNTIME_METHODS='["ccall", "cwrap"]'
